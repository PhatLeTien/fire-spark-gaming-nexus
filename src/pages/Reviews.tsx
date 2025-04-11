
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Reviews = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Game Reviews</h1>
        <div className="bg-gaming-secondary/20 rounded-lg p-8 text-center">
          <p className="text-gray-300 text-lg">Reviews content coming soon!</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Reviews;
