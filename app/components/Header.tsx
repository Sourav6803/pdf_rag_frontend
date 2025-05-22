'use client';

import Link from 'next/link';
import { UserButton, SignInButton, useUser } from '@clerk/nextjs';
import { Menu } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const { isSignedIn, user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full px-4 md:px-8 py-4 border-b bg-white shadow-sm flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Link href="/" className="text-xl font-bold text-blue-600 tracking-tight">
          AskYourPDF.ai
        </Link>
      </div>

      {/* Desktop Auth Section */}
      <div className="hidden md:flex items-center space-x-4">
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <SignInButton mode="modal">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              Sign In
            </button>
          </SignInButton>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <Menu className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 right-4 bg-white border shadow-lg rounded-md p-4 w-40 z-50 md:hidden">
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <SignInButton mode="modal">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                Sign In
              </button>
            </SignInButton>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
