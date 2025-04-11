
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Bell, User, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  const handleAuthButtonClick = () => {
    if (isAuthenticated) {
      // Show dropdown menu handled by the DropdownMenu component
    } else {
      navigate('/login');
    }
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
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                    <Avatar className="h-8 w-8 bg-gaming-primary/20 hover:bg-gaming-primary/30 transition-colors">
                      <AvatarFallback className="bg-gaming-primary/20 text-white">
                        {user?.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-gaming-dark border-gaming-secondary/40">
                  <DropdownMenuLabel className="text-gray-200">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gaming-secondary/20" />
                  <DropdownMenuItem className="text-gray-200 hover:bg-gaming-secondary/20 cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-gray-200 hover:bg-gaming-secondary/20 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button className="btn-gaming" onClick={handleAuthButtonClick}>Sign In</Button>
            )}
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
                </div>
                {isAuthenticated ? (
                  <Button 
                    className="btn-gaming flex items-center space-x-2"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} />
                    <span>Log out</span>
                  </Button>
                ) : (
                  <Button 
                    className="btn-gaming"
                    onClick={handleAuthButtonClick}
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
