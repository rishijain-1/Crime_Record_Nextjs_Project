import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LocalSwitcher from '../LocalSwitcher/LocalSwitcher';

const Navbar = () => {
 
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-white text-2xl font-bold">
          <a href="#">Crime Report</a>
        </div>

        {/* Language Dropdown */}
        
        <LocalSwitcher/>
      </div>
    </nav>
  );
};

export default Navbar;
