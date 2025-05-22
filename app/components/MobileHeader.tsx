'use client'
import React from 'react';
import { Menu } from 'lucide-react';

interface MobileHeaderProps {
  onMenuClick: () => void;
}

const MobileHeader = ({ onMenuClick }: MobileHeaderProps) => {
  return (
    <header className="md:hidden bg-purple-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">AskYourPDF.ai</h1>
      <button onClick={onMenuClick} aria-label="Open Sidebar">
        <Menu size={24} />
      </button>
    </header>
  );
};

export default MobileHeader;