
import React, { createContext, useContext, useState, useEffect } from 'react';
import { InventoryItem } from '@/types';
import { toast } from '@/components/ui/use-toast';

interface InventoryContextType {
  items: InventoryItem[];
  addItem: (item: Omit<InventoryItem, 'id' | 'addedAt'>) => void;
  deleteItem: (id: string) => void;
  currentScannedUID: string | null;
  setCurrentScannedUID: (uid: string | null) => void;
  simulateScan: () => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<InventoryItem[]>(() => {
    const savedItems = localStorage.getItem('inventoryItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [currentScannedUID, setCurrentScannedUID] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('inventoryItems', JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: Omit<InventoryItem, 'id' | 'addedAt'>) => {
    const item: InventoryItem = {
      ...newItem,
      id: crypto.randomUUID(),
      addedAt: new Date().toISOString()
    };
    
    setItems((prevItems) => [...prevItems, item]);
    setCurrentScannedUID(null);
    toast({
      title: "Item Added",
      description: `${newItem.name} has been added to inventory`,
    });
  };

  const deleteItem = (id: string) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== id));
    toast({
      title: "Item Removed",
      description: "The item has been removed from inventory",
    });
  };

  const simulateScan = () => {
    // Generate a random RFID UID
    const randomUID = Math.random().toString(36).substring(2, 15);
    setCurrentScannedUID(randomUID);
    toast({
      title: "RFID Detected",
      description: `UID: ${randomUID}`,
    });
  };

  return (
    <InventoryContext.Provider value={{ 
      items, 
      addItem, 
      deleteItem, 
      currentScannedUID, 
      setCurrentScannedUID,
      simulateScan 
    }}>
      {children}
    </InventoryContext.Provider>
  );
};
