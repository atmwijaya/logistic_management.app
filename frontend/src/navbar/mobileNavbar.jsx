import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from "../assets/Dewasaku_Putih.png";

const MobileNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Daftar route yang ada di navbar
  const navItems = [
    { path: '/', name: 'Beranda' },
    { path: '/katalog', name: 'katalog' },
    { path: '/faq', name: 'FAQ' }
  ];

  const handleNavClick = (path) => {
    navigate(path);
    setIsMenuOpen(false); // Tutup menu setelah navigasi
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-900 px-4 py-4 shadow-lg md:hidden">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => navigate('/')}
        >
          <img
            src={logo}
            className="h-12 object-contain"
            alt="Logo Racana Diponegoro"
          />
        </div>
        
        {/* Hamburger Menu Button */}
        <button
          className="text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-6 flex flex-col justify-between">
            <span className={`block h-0.5 w-full bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
            <span className={`block h-0.5 w-full bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-0.5 w-full bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-0 left-0 w-full h-full bg-blue-900 z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full pt-20 px-6">
          {/* Close Button */}
          <button
            className="absolute top-6 right-4 text-white text-2xl"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            ✕
          </button>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-8">
            {navItems.map((item) => (
              <div 
                key={item.path}
                className="relative group text-white font-medium text-xl cursor-pointer py-2"
                onClick={() => handleNavClick(item.path)}
              >
                <div className="flex items-center justify-between">
                  {item.name}
                  {location.pathname === item.path && (
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                  )}
                </div>
                
                {/* Garis bawah untuk halaman aktif */}
                <span className={`absolute left-0 bottom-0 h-0.5 bg-orange-400 transition-all duration-300 ${
                  location.pathname === item.path ? 'w-full' : 'w-0'
                }`}></span>
              </div>
            ))}
          </div>

          {/* Footer di menu mobile */}
          <div className="mt-auto pb-8 text-center text-white text-sm opacity-80">
            <p>Racana Diponegoro</p>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        ></div>
      )}
    </nav>
  );
};

export default MobileNavbar;