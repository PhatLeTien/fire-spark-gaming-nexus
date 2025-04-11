
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, Bell, User } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="py-4 relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gaming-primary to-gaming-accent">
              FireSpark
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/news" className="text-gray-300 hover:text-white transition-colors">News</Link>
            <Link to="/reviews" className="text-gray-300 hover:text-white transition-colors">Reviews</Link>
            <Link to="/guides" className="text-gray-300 hover:text-white transition-colors">Guides</Link>
            <Link to="/ai-chat" className="text-gray-300 hover:text-white transition-colors">AI Chat</Link>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-300 hover:text-white transition-colors">
              <Search size={20} />
            </button>
            <button className="text-gray-300 hover:text-white transition-colors">
              <Bell size={20} />
            </button>
            <button className="text-gray-300 hover:text-white transition-colors">
              <User size={20} />
            </button>
            <Button className="btn-gaming">Sign In</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-gaming-dark border-t border-gaming-secondary animate-fade-in">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link to="/news" className="text-gray-300 hover:text-white transition-colors py-2">News</Link>
              <Link to="/reviews" className="text-gray-300 hover:text-white transition-colors py-2">Reviews</Link>
              <Link to="/guides" className="text-gray-300 hover:text-white transition-colors py-2">Guides</Link>
              <Link to="/ai-chat" className="text-gray-300 hover:text-white transition-colors py-2">AI Chat</Link>
              <div className="pt-2 flex justify-between items-center">
                <div className="flex space-x-4">
                  <button className="text-gray-300 hover:text-white transition-colors">
                    <Search size={20} />
                  </button>
                  <button className="text-gray-300 hover:text-white transition-colors">
                    <Bell size={20} />
                  </button>
                  <button className="text-gray-300 hover:text-white transition-colors">
                    <User size={20} />
                  </button>
                </div>
                <Button className="btn-gaming">Sign In</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
