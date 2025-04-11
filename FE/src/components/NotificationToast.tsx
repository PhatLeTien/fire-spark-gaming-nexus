
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface NotificationToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-6 right-6 z-50 animate-slide-in max-w-xs bg-gaming-gradient p-1 rounded-lg shadow-lg">
      <div className="flex items-center justify-between bg-gaming-dark p-3 rounded-md">
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-gaming-accent mr-3 animate-pulse-glow"></div>
          <p className="text-sm font-medium text-white">{message}</p>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default NotificationToast;
