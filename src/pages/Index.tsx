
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import WelcomeHeader from '@/components/WelcomeHeader';
import HeroCarousel from '@/components/HeroCarousel';
import QuickAccess from '@/components/QuickAccess';
import TodaysHighlights from '@/components/TodaysHighlights';
import NotificationToast from '@/components/NotificationToast';
import Footer from '@/components/Footer';

const Index = () => {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Show notification after 3 seconds
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Notification Toast */}
      <NotificationToast 
        message="New review: Starfield - The Ultimate Space RPG" 
        isVisible={showNotification}
        onClose={() => setShowNotification(false)}
      />
      
      {/* Navbar */}
      <Navbar />
      
      <main className="flex-grow pb-16">
        {/* Welcome Header */}
        <WelcomeHeader />
        
        {/* Hero Carousel */}
        <section className="container mx-auto px-4 py-4">
          <HeroCarousel />
        </section>
        
        {/* Quick Access */}
        <section>
          <QuickAccess />
        </section>
        
        {/* Today's Highlights */}
        <section>
          <TodaysHighlights />
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
