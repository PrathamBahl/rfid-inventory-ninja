
import React from 'react';
import { Database } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-primary to-secondary py-5 px-6 shadow-lg transition-all duration-300 ease-in-out">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 transition-transform duration-300 hover:scale-105">
          <div className="rounded-full bg-white/15 p-2 backdrop-blur-sm">
            <Database className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            RFID Inventory Ninja
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
