// components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white  p-6 text-center text-sm mt-auto">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} ChatPDF AI. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-purple-400">Privacy Policy</a>
          <a href="#" className="hover:text-purple-400">Terms of Service</a>
          <a href="#" className="hover:text-purple-400">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;