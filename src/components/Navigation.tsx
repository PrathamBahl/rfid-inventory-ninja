import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ChevronDown, Menu, X } from 'lucide-react';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Text */}
          <Link to="/" className="flex items-center gap-3 transition-transform hover:scale-105">
            {/* Logo SVG */}
            <div className="w-8 h-8">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                {/* Main Fridge Body */}
                <rect 
                  x="4" 
                  y="2" 
                  width="12" 
                  height="20" 
                  rx="2" 
                  className="fill-[#2B4D66]"
                />
                {/* Light Blue Front */}
                <rect 
                  x="5" 
                  y="3" 
                  width="10" 
                  height="18" 
                  rx="1"
                  className="fill-[#7DD3FC]"
                />
                {/* Fridge Division Line */}
                <rect
                  x="5"
                  y="9"
                  width="10"
                  height="1"
                  className="fill-[#2B4D66]"
                />
                {/* Handle Top */}
                <rect
                  x="6"
                  y="5"
                  width="2"
                  height="2"
                  className="fill-[#2B4D66]"
                />
                {/* Handle Bottom */}
                <rect
                  x="6"
                  y="12"
                  width="2"
                  height="4"
                  className="fill-[#2B4D66]"
                />
                {/* Plus Sign */}
                <path
                  d="M8 6.5h2M9 5.5v2"
                  stroke="#2B4D66"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                />
                {/* RFID Waves */}
                <path
                  d="M17 6C18.5 8 19 10 19 12C19 14 18.5 16 17 18"
                  stroke="#2B4D66"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M18.5 4C20.5 6.5 21 9.25 21 12C21 14.75 20.5 17.5 18.5 20"
                  stroke="#2B4D66"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
            {/* Brand Text */}
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-[#2B4D66]">
                Fresh Fridge
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105">
              Home
            </Link>
            <div className="relative group">
              <Button 
                variant="ghost" 
                className="flex items-center gap-1 transition-all duration-300 hover:scale-105 hover:bg-blue-50"
              >
                About
                <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
              </Button>
              <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-lg py-2 hidden group-hover:block transition-all duration-300 transform origin-top">
                <Link 
                  to="/about/founders" 
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 transition-all duration-300 hover:scale-105"
                >
                  Founders
                </Link>
                <Link 
                  to="/about/advisors" 
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 transition-all duration-300 hover:scale-105"
                >
                  Project Advisors
                </Link>
              </div>
            </div>
            <Link to="/inventory" className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105">
              Inventory
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="md:hidden transition-all duration-300 hover:scale-110"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 transition-all duration-300 transform origin-top">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105">
                Home
              </Link>
              <div className="space-y-2">
                <div className="font-semibold text-gray-700">About</div>
                <div className="pl-4 space-y-2">
                  <Link to="/about/founders" className="block text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-105">
                    Founders
                  </Link>
                  <Link to="/about/advisors" className="block text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-105">
                    Project Advisors
                  </Link>
                </div>
              </div>
              <Link to="/inventory" className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105">
                Inventory
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105">
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 