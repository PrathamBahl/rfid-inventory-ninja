import { useState, useEffect } from 'react';
import { api, Item } from '../services/api';
import { toast } from 'sonner';
import { differenceInDays, parseISO } from 'date-fns';

export const useInventory = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [lastScan, setLastScan] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessingScan, setIsProcessingScan] = useState(false);

  // Check for items expiring soon
  const checkExpiringItems = (items: Item[]) => {
    const today = new Date();
    items.forEach(item => {
      if (item.expiry_date) {
        const expiryDate = parseISO(item.expiry_date);
        const daysUntilExpiry = differenceInDays(expiryDate, today);
        
        if (daysUntilExpiry <= 7 && daysUntilExpiry > 0) {
          toast.warning(`${item.name} will expire in ${daysUntilExpiry} days!`, {
            description: `Item with UID ${item.uid} expires on ${item.expiry_date}`,
            duration: 5000,
          });
        } else if (daysUntilExpiry <= 0) {
          toast.error(`${item.name} has expired!`, {
            description: `Item with UID ${item.uid} expired on ${item.expiry_date}`,
            duration: 5000,
          });
        }
      }
    });
  };

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get inventory items
        const itemsData = await api.getItems();
        console.log('Fetched items:', itemsData);
        setItems(itemsData || []);
        
        // Check for expiring items
        checkExpiringItems(itemsData || []);

        // Get last scan
        const lastScanData = await api.getLastScan();
        if (lastScanData.uid !== "No scans yet") {
          console.log('Retrieved last scan from server:', lastScanData.uid);
          setLastScan(lastScanData.uid);
          setIsProcessingScan(true);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to connect to Flask server. Please make sure it is running on port 5175.');
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up periodic checks for expiring items
    const expiryCheckInterval = setInterval(() => {
      checkExpiringItems(items);
    }, 3600000); // Check every hour

    return () => {
      clearInterval(expiryCheckInterval);
    };
  }, []);

  // Listen for RFID scans
  useEffect(() => {
    const handleRfidScan = (data: { uid: string }) => {
      console.log('Received RFID scan data:', data);
      
      // Only process new scans if we're not already processing one
      if (!isProcessingScan) {
        console.log('Processing new RFID scan:', data.uid);
        setIsProcessingScan(true);
        setLastScan(data.uid);
        api.pauseScanning();
      } else {
        console.log('Ignoring scan - already processing one');
      }
    };

    // Set up event listeners
    console.log('Setting up RFID scan listeners');
    api.onRfidScanned(handleRfidScan);

    // Cleanup
    return () => {
      console.log('Cleaning up RFID scan listeners');
      api.disconnect();
    };
  }, [isProcessingScan]);

  const addItem = async (name: string, expiryDate: string) => {
    if (!lastScan) {
      throw new Error('No RFID tag scanned');
    }

    try {
      console.log('Adding item with UID:', lastScan);
      await api.addItem({
        name,
        expiry_date: expiryDate,
      });
      
      // Refresh items list
      const updatedItems = await api.getItems();
      setItems(updatedItems || []);
      
      // Check for expiring items in the updated list
      checkExpiringItems(updatedItems || []);
      
      // Reset states
      setLastScan(null);
      setIsProcessingScan(false);
      api.resumeScanning();
      
      console.log('Item added successfully');
    } catch (err) {
      console.error('Error adding item:', err);
      throw err;
    }
  };

  const deleteItem = async (uid: string) => {
    try {
      await api.deleteItem(uid);
      setItems(items.filter(item => item.uid !== uid));
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const assignItem = async (uid: string, name: string, expiry: string) => {
    try {
      await api.assignItem(uid, name, expiry);
      const updatedItems = await api.getItems();
      setItems(updatedItems || []);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return {
    items,
    lastScan,
    loading,
    error,
    addItem,
    deleteItem,
    assignItem,
    checkExpiringItems,
  };
}; 