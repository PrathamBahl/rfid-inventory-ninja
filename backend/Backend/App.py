from flask import Flask, jsonify, request
from flask_socketio import SocketIO
from flask_cors import CORS
import sqlite3
import serial
import threading
import eventlet
import time
import re

# Flask Setup
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins

# WebSocket Setup
socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    async_mode="threading",
    ping_timeout=30,
    ping_interval=10
)

# RFID Serial Configuration
RFID_PORT = "COM3"
BAUD_RATE = 9600
rfid_reader = None
scanning_paused = False  # Flag to control scanning
last_scanned_uid = None  # Store the last scanned UID

try:
    rfid_reader = serial.Serial(RFID_PORT, BAUD_RATE, timeout=1)
    print(f"✅ RFID Scanner Connected on {RFID_PORT}")
except Exception as e:
    print(f"❌ Error connecting to RFID scanner: {e}")

# Database Initialization
def init_db():
    conn = sqlite3.connect("database.db")
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            uid TEXT UNIQUE NOT NULL,
            name TEXT,
            expiry_date TEXT,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()

init_db()

# WebSocket Event Handlers
@socketio.on("connect")
def handle_connect():
    print("✅ WebSocket Connected!")

@socketio.on("disconnect")
def handle_disconnect():
    print("❌ WebSocket Disconnected")

@socketio.on("pause_scanning")
def handle_pause_scanning():
    global scanning_paused
    scanning_paused = True
    print("⏸️ Scanning paused")

@socketio.on("resume_scanning")
def handle_resume_scanning():
    global scanning_paused
    scanning_paused = False
    print("▶️ Scanning resumed")

# Function to Read RFID
def read_rfid():
    global rfid_reader, scanning_paused, last_scanned_uid
    buffer = ""
    while True:
        if rfid_reader and rfid_reader.is_open and not scanning_paused:
            try:
                if rfid_reader.in_waiting:
                    # Read data byte by byte
                    char = rfid_reader.read().decode()
                    buffer += char
                    
                    # If we have a complete line
                    if '\n' in buffer:
                        lines = buffer.split('\n')
                        buffer = lines[-1]  # Keep the incomplete line
                        
                        for line in lines[:-1]:  # Process complete lines
                            line = line.strip()
                            print(f"Raw line: '{line}'")
                            
                            # Skip empty lines
                            if not line:
                                continue
                            
                            # Handle "Card detected" or "Reading" messages
                            if "Card detected" in line or "Reading" in line:
                                print("Card detection message received, waiting for UID...")
                                continue
                            
                            # Try different UID patterns
                            # Pattern 1: Standard hex format (e.g., "0A1B2C3D")
                            uid_match = re.search(r'[0-9A-Fa-f]{8,14}', line)
                            # Pattern 2: Decimal format with hyphens (e.g., "123-456-789")
                            if not uid_match:
                                decimal_match = re.search(r'\d{1,3}(?:-\d{1,3}){2,4}', line)
                                if decimal_match:
                                    # Convert decimal format to hex
                                    uid = decimal_match.group(0).replace('-', '')
                                    uid = format(int(uid), 'X')
                                    uid_match = re.match(r'[0-9A-Fa-f]{8,14}', uid)
                            
                            if uid_match:
                                uid = uid_match.group(0).upper()
                                print(f"✅ Valid UID extracted: {uid}")
                                last_scanned_uid = uid
                                store_uid(uid)
                                socketio.emit("rfid_scanned", {"uid": uid})
                                scanning_paused = True
                                print("⏸️ Scanning paused after valid UID detection")
                                break
                            else:
                                print(f"❌ No valid UID pattern found in: '{line}'")
                                
            except Exception as e:
                print(f"⚠️ RFID Read Error: {e}")
                print(f"Error type: {type(e)}")
                import traceback
                print(f"Traceback: {traceback.format_exc()}")
                buffer = ""  # Clear buffer on error
        time.sleep(0.1)  # Small delay to prevent CPU overuse

# Store UID in Database
def store_uid(uid):
    conn = sqlite3.connect("database.db")
    c = conn.cursor()
    c.execute("INSERT OR IGNORE INTO items (uid) VALUES (?)", (uid,))
    conn.commit()
    conn.close()

@app.route("/last-scan", methods=["GET"])
def get_last_scan():
    global last_scanned_uid
    if last_scanned_uid:
        return jsonify({"uid": last_scanned_uid})
    return jsonify({"uid": "No scans yet"})

@app.route("/delete-uid/<uid>", methods=["DELETE"])
def delete_uid(uid):
    conn = sqlite3.connect("database.db")
    c = conn.cursor()
    c.execute("DELETE FROM items WHERE uid = ?", (uid,))
    conn.commit()
    conn.close()
    return jsonify({"message": f"UID {uid} deleted successfully!"})

@app.route("/inventory", methods=["GET"])
def get_inventory():
    conn = sqlite3.connect("database.db")
    c = conn.cursor()
    c.execute("SELECT uid, name, expiry_date FROM items")
    items = [{"uid": row[0], "name": row[1], "expiry_date": row[2]} for row in c.fetchall()]
    conn.close()
    return jsonify({"items": items})

@app.route("/assign-item", methods=["POST"])
def assign_item():
    try:
        data = request.json
        print(f"Received assign-item request with data: {data}")
        
        if not data:
            print("Error: No data received")
            return jsonify({"error": "No data received"}), 400
            
        if "uid" not in data:
            print("Error: Missing uid in request")
            return jsonify({"error": "Missing uid"}), 400
            
        if "name" not in data:
            print("Error: Missing name in request")
            return jsonify({"error": "Missing name"}), 400
            
        if "expiry" not in data:
            print("Error: Missing expiry in request")
            return jsonify({"error": "Missing expiry"}), 400

        uid, name, expiry = data["uid"], data["name"], data["expiry"]
        print(f"Processing assignment for UID: {uid}, Name: {name}, Expiry: {expiry}")
        
        conn = sqlite3.connect("database.db")
        c = conn.cursor()
        
        # First check if the UID exists
        c.execute("SELECT uid FROM items WHERE uid = ?", (uid,))
        existing_item = c.fetchone()
        
        if not existing_item:
            print(f"Error: UID {uid} not found in database")
            conn.close()
            return jsonify({"error": f"UID {uid} not found"}), 404
            
        # Update the item
        c.execute("UPDATE items SET name = ?, expiry_date = ? WHERE uid = ?", (name, expiry, uid))
        conn.commit()
        conn.close()
        
        print(f"Successfully assigned item: UID={uid}, Name={name}, Expiry={expiry}")
        
        # Resume scanning after item is assigned
        global scanning_paused, last_scanned_uid
        scanning_paused = False
        last_scanned_uid = None  # Clear the last scanned UID
        print("▶️ Scanning resumed after item assignment")
        
        return jsonify({"message": "Item assigned successfully"})
    except Exception as e:
        print(f"Error in assign_item: {str(e)}")
        return jsonify({"error": str(e)}), 500

# Run RFID Scanner in Background
if rfid_reader:
    threading.Thread(target=read_rfid, daemon=True).start()
else:
    print("⚠️ RFID Scanner not connected. Skipping RFID thread.")

# Start Flask Server
if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5175, debug=False)
