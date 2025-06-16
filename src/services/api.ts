import axios from 'axios';
import io from 'socket.io-client';

// API endpoints
const FLASK_API_URL = 'http://localhost:5175';

// Create axios instance
const flaskApi = axios.create({
  baseURL: FLASK_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create socket connection with working configuration
const flaskSocket = io(FLASK_API_URL, {
  transports: ["websocket"],  // Force WebSocket transport
  reconnection: true,         // Enable auto-reconnection
  reconnectionAttempts: 10,   // Retry up to 10 times
  reconnectionDelay: 3000,    // Wait 3 seconds before retrying
  timeout: 20000,             // 20 seconds timeout
});

// Debug socket connection
flaskSocket.on('connect', () => {
  console.log('✅ WebSocket Connected!');
});

flaskSocket.on('disconnect', () => {
  console.warn('⚠️ WebSocket Disconnected! Trying to reconnect...');
});

flaskSocket.on('connect_error', (err) => {
  console.error('❌ WebSocket Connection Error:', err);
});

// Types
export interface Item {
  uid: string;
  name?: string;
  expiry_date?: string;
}

// API functions
export const api = {
  // Flask API endpoints
  getItems: async () => {
    const response = await flaskApi.get<{ items: Item[] }>('/inventory');
    console.log('Fetched items:', response.data);
    return response.data.items;
  },

  addItem: async (item: Omit<Item, 'uid'>) => {
    try {
      // Get the last scanned UID
      const lastScan = await flaskApi.get<{ uid: string }>('/last-scan');
      console.log('Last scan response:', lastScan.data);
      
      if (!lastScan.data.uid || lastScan.data.uid === "No scans yet") {
        throw new Error('No RFID tag scanned');
      }
      
      // Assign the item to the last scanned UID
      const response = await flaskApi.post('/assign-item', {
        uid: lastScan.data.uid,
        name: item.name,
        expiry: item.expiry_date
      });
      
      console.log('Add item response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in addItem:', error);
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error || 'Failed to add item');
      }
      throw error;
    }
  },

  deleteItem: async (uid: string) => {
    try {
      const response = await flaskApi.delete(`/delete-uid/${uid}`);
      console.log('Delete item response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in deleteItem:', error);
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error || 'Failed to delete item');
      }
      throw error;
    }
  },

  getLastScan: async () => {
    try {
      const response = await flaskApi.get<{ uid: string }>('/last-scan');
      console.log('Last scan response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in getLastScan:', error);
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error || 'Failed to get last scan');
      }
      throw error;
    }
  },

  getInventory: async () => {
    const response = await flaskApi.get<{ uids: string[] }>('/inventory');
    return response.data;
  },

  assignItem: async (uid: string, name: string, expiry: string) => {
    const response = await flaskApi.post('/assign-item', { uid, name, expiry });
    return response.data;
  },

  // Socket events
  onRfidScanned: (callback: (data: { uid: string }) => void) => {
    console.log('Setting up RFID scan listener');
    
    // Remove any existing listeners to prevent duplicates
    flaskSocket.off('rfid_scanned');
    
    // Add new listener with debug logging
    flaskSocket.on('rfid_scanned', (data) => {
      console.log('📡 Received RFID scan from Flask server:', data);
      if (data && data.uid) {
        console.log('✅ Valid UID received:', data.uid);
        callback(data);
      } else {
        console.warn('⚠️ Invalid RFID scan data received:', data);
      }
    });
  },

  // Scanning control
  pauseScanning: () => {
    console.log('⏸️ Pausing scanning...');
    flaskSocket.emit('pause_scanning');
  },

  resumeScanning: () => {
    console.log('▶️ Resuming scanning...');
    flaskSocket.emit('resume_scanning');
  },

  // Cleanup
  disconnect: () => {
    console.log('🔌 Disconnecting from WebSocket server');
    flaskSocket.disconnect();
  },
}; 