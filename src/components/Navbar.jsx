      {/* Footer */}
      <footer className="bg-gradient-to-r from-indigo-900 via-blue-900 to-cyan-800 text-cyan-100 py-6 px-4 mt-12 shadow-inner">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <span className="font-semibold text-lg">&copy; {new Date().getFullYear()} My store. All rights reserved.</span>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { FiShoppingCart, FiShoppingBag } from 'react-icons/fi';

const Navbar = ({ cartItems = [], onCartClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cartCount = cartItems.length;
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-indigo-900 via-blue-900 to-cyan-800 text-white px-6 py-4 flex justify-between items-center shadow-lg">
        <h1 className="text-3xl font-extrabold tracking-tight text-cyan-300 drop-shadow flex items-center gap-2 cursor-pointer hover:brightness-110 transition">
          <FiShoppingBag className="inline-block w-8 h-8 text-cyan-200 mr-1" />
          My store
        </h1>
        {/* Hamburger icon for mobile */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Open Menu" className="p-2 rounded-lg hover:bg-cyan-900/40 focus:outline-none focus:ring-2 focus:ring-cyan-400">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {/* Desktop menu */}
        <div className="space-x-6 hidden md:flex items-center">
          <Link to="/" className="text-cyan-200 hover:text-white font-medium transition-colors cursor-pointer">Home</Link>
          <button onClick={onCartClick} className="relative flex items-center px-3 py-1 rounded-lg bg-cyan-700 hover:bg-cyan-600 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer" type="button">
            <FiShoppingCart className="w-5 h-5 mr-1" />
            <span>Cart</span>
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full px-2 text-xs font-bold shadow">{cartCount}</span>
          </button>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="px-4 py-1 rounded-lg bg-pink-600 hover:bg-pink-500 transition-colors font-semibold focus:outline-none focus:ring-2 focus:ring-pink-300 cursor-pointer">Logout</button>
          ) : (
            <Link to="/login" className="px-4 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 transition-colors font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-300 cursor-pointer">Login</Link>
          )}
        </div>
      </nav>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="bg-gradient-to-b from-indigo-900 via-blue-900 to-cyan-800 text-white px-6 py-4 flex flex-col space-y-3 md:hidden shadow-lg z-50">
          <Link to="/" className="text-cyan-200 hover:text-white font-medium transition-colors cursor-pointer">Home</Link>
          <button onClick={onCartClick} className="relative flex items-center px-3 py-1 rounded-lg bg-cyan-700 hover:bg-cyan-600 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer" type="button">
            <FiShoppingCart className="w-5 h-5 mr-1" />
            <span>Cart</span>
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full px-2 text-xs font-bold shadow">{cartCount}</span>
          </button>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="px-4 py-1 rounded-lg bg-pink-600 hover:bg-pink-500 transition-colors font-semibold focus:outline-none focus:ring-2 focus:ring-pink-300 cursor-pointer">Logout</button>
          ) : (
            <Link to="/login" className="px-4 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 transition-colors font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-300 cursor-pointer">Login</Link>
          )}
        </div>
      )}
    </>
  )
}

export default Navbar
