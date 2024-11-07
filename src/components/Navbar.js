import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Navbar = ({ walletAddress, onDisconnect }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const shortAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDisconnect = () => {
    setIsDropdownOpen(false);
    onDisconnect();
    navigate('/');
  };

  return (
    <nav className="flex justify-between items-center py-4 px-6">
      <div className="text-2xl font-bold text-blue-600">
        SNITCH
      </div>
      <div className="relative" ref={dropdownRef}>
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="
            bg-blue-500 
            text-white 
            px-4 py-2 
            rounded-full 
            hover:bg-blue-600 
            transition-colors
            font-medium
          "
        >
          {shortAddress}
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="
            absolute 
            right-0 
            mt-2 
            w-48 
            bg-white 
            rounded-xl 
            shadow-lg 
            py-1 
            z-10
            border border-gray-100
            animate-fadeIn
          ">
            <button
              onClick={handleDisconnect}
              className="
                w-full 
                text-left 
                px-4 
                py-2 
                text-sm 
                text-gray-700 
                hover:bg-gray-50
                transition-colors
              "
            >
              Disconnect Wallet
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}; 