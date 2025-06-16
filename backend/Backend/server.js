const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(cors());
app.use(express.json());

// Database setup
const db = new sqlite3.Database("inventory.db", (err) => {
  if (err) console.error("❌ Database connection failed:", err);
  else console.log("✅ Connected to SQLite database.");
});

db.run(
  `CREATE TABLE IF NOT EXISTS items (
    uid TEXT PRIMARY KEY, 
    name TEXT, 
    expiry_date TEXT
  )`
);

// WebSocket connection handling
io.on("connection", (socket) => {
  console.log(`✅ WebSocket Connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`❌ WebSocket Disconnected: ${socket.id}`);
  });
});

// 📡 API Routes
app.get("/items", (req, res) => {
  db.all("SELECT * FROM items", [], (err, rows) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(rows);
  });
});

app.post("/items", (req, res) => {
  const { uid, name, expiryDate } = req.body;
  db.run(
    "INSERT INTO items (uid, name, expiry_date) VALUES (?, ?, ?)",
    [uid, name, expiryDate],
    (err) => {
      if (err) return res.status(400).json({ message: "Item already exists" });
      io.emit("rfid_scanned", { uid }); // Notify frontend
      res.status(201).json({ message: "Item added", item: { uid, name, expiryDate } });
    }
  );
});

app.delete("/items/:uid", (req, res) => {
  const { uid } = req.params;
  db.run("DELETE FROM items WHERE uid = ?", [uid], function (err) {
    if (err) return res.status(500).json({ message: "Error deleting item" });
    res.json({ message: "Item deleted" });
  });
});

// Start server
const PORT = 5173;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
