
import React from 'react';
import Header from '@/components/Header';
import RFIDScanner from '@/components/RFIDScanner';
import ItemRegistrationForm from '@/components/ItemRegistrationForm';
import InventoryList from '@/components/InventoryList';
import { InventoryProvider } from '@/context/InventoryContext';

const Index = () => {
  return (
    <InventoryProvider>
      <div className="min-h-screen flex flex-col bg-background transition-colors duration-300">
        <Header />
        <main className="flex-1 container mx-auto py-8 px-4 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
            <RFIDScanner />
            <ItemRegistrationForm />
          </div>
          <InventoryList />
        </main>
        <footer className="bg-muted py-4 text-center text-sm text-muted-foreground transition-colors duration-300">
          RFID Inventory Ninja &copy; {new Date().getFullYear()}
        </footer>
      </div>
    </InventoryProvider>
  );
};

export default Index;
