
import React, { useState, useEffect } from 'react';

const WelcomeHeader = () => {
  const [greeting, setGreeting] = useState('');
  const [username, setUsername] = useState('Gamer');

  useEffect(() => {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
      setGreeting('Good Morning');
    } else if (hour >= 12 && hour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }

    // This would normally come from user authentication
    // For now, we'll just use a static name
    setUsername('Phát');
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white animate-fade-in">
        {greeting}, <span className="text-gaming-primary">{username}</span> 🎮
      </h1>
      <p className="text-gray-400 mt-2 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        Ready to dive into the latest in gaming?
      </p>
    </div>
  );
};

export default WelcomeHeader;
