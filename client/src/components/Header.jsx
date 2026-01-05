import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X } from 'lucide-react'; // Assuming lucide-react is available or use react-icons if preferred

const Header = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAuthClick = async () => {
    if (user) {
      await signOutUser();
      navigate('/login');
    } else {
      navigate('/login');
    }
    setIsMenuOpen(false); // Close menu after action
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Profile', path: '/profile' },
  ];

  return (
    <header className="sticky top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 px-6 md:px-12 py-4 z-50 shadow-sm transition-all duration-300">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div
          onClick={() => navigate('/')}
          className="cursor-pointer flex items-center gap-2"
        >
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-[#2DC08D]">
            ProFileX
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex gap-8 font-medium text-gray-600">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.path} className="hover:text-[#2DC08D] transition relative group">
                  {link.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#2DC08D] transition-all group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>

          <button
            onClick={handleAuthClick}
            className={`px-5 py-2 rounded-full font-medium transition duration-300 ${user
                ? 'bg-red-50 text-red-500 hover:bg-red-100 border border-red-200'
                : 'bg-[#2DC08D] text-white hover:bg-[#25a075] shadow-md hover:shadow-lg'
              }`}
          >
            {user ? 'Logout' : 'Get Started'}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-600 focus:outline-none">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-lg py-4 px-6 flex flex-col gap-4 animate-in slide-in-from-top-5">
          <ul className="flex flex-col gap-4 font-medium text-gray-600">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block hover:text-[#2DC08D] transition"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <hr className="border-gray-100" />
          <button
            onClick={handleAuthClick}
            className={`w-full text-center px-5 py-2 rounded-lg font-medium transition duration-300 ${user
                ? 'bg-red-50 text-red-500 hover:bg-red-100 border border-red-200'
                : 'bg-[#2DC08D] text-white hover:bg-[#25a075] shadow-md'
              }`}
          >
            {user ? 'Logout' : 'Get Started'}
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
