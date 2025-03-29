
import React from 'react';
import { Database } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-primary py-4 px-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="h-6 w-6 text-white" />
          <h1 className="text-xl font-bold text-white">RFID Inventory Ninja</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
