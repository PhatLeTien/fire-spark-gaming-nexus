
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Twitter, Facebook, Instagram, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-gaming-secondary/20 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gaming-primary to-gaming-accent">
                FireSpark
              </div>
            </Link>
            <p className="text-gray-400 mb-4">
              Your ultimate destination for gaming news, reviews, guides, and AI-powered insights.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gaming-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gaming-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gaming-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gaming-primary transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Content</h4>
            <ul className="space-y-2">
              <li><Link to="/news" className="text-gray-400 hover:text-white transition-colors">News</Link></li>
              <li><Link to="/reviews" className="text-gray-400 hover:text-white transition-colors">Reviews</Link></li>
              <li><Link to="/guides" className="text-gray-400 hover:text-white transition-colors">Guides</Link></li>
              <li><Link to="/videos" className="text-gray-400 hover:text-white transition-colors">Videos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Features</h4>
            <ul className="space-y-2">
              <li><Link to="/ai-chat" className="text-gray-400 hover:text-white transition-colors">AI Chat</Link></li>
              <li><Link to="/favorites" className="text-gray-400 hover:text-white transition-colors">Favorites</Link></li>
              <li><Link to="/trending" className="text-gray-400 hover:text-white transition-colors">Trending</Link></li>
              <li><Link to="/search" className="text-gray-400 hover:text-white transition-colors">Search</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:info@firespark.com" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <Mail size={16} className="mr-2" />
                  info@firespark.com
                </a>
              </li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gaming-secondary/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 FireSpark Gaming Nexus. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm flex items-center">
            Made with <Heart size={14} className="mx-1 text-gaming-accent" /> for gamers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
