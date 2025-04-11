
import React from 'react';
import { Clock, Eye, Tag, ChevronRight } from 'lucide-react';

interface Highlight {
  id: number;
  title: string;
  category: string;
  tags: string[];
  image: string;
  readTime: string;
  views: string;
}

const highlights: Highlight[] = [
  {
    id: 1,
    title: 'The 10 Most Anticipated Games of 2025',
    category: 'Feature',
    tags: ['upcoming', 'AAA', 'indie'],
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop',
    readTime: '5 min',
    views: '12K'
  },
  {
    id: 2,
    title: 'Baldur\'s Gate 3: Complete Beginner\'s Guide',
    category: 'Guide',
    tags: ['RPG', 'tutorial', 'tips'],
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop',
    readTime: '10 min',
    views: '24K'
  },
  {
    id: 3,
    title: 'PS5 Pro vs Xbox Series X: The Ultimate Comparison',
    category: 'Hardware',
    tags: ['console', 'comparison', 'next-gen'],
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=2057&auto=format&fit=crop',
    readTime: '7 min',
    views: '18K'
  },
  {
    id: 4,
    title: 'How Indie Games Are Reshaping the Industry',
    category: 'Analysis',
    tags: ['indie', 'business', 'trends'],
    image: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?q=80&w=2067&auto=format&fit=crop',
    readTime: '8 min',
    views: '9K'
  }
];

const TodaysHighlights = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Today's Highlights</h2>
        <button className="flex items-center text-gaming-primary hover:text-gaming-accent transition-colors">
          <span className="mr-1">View All</span>
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {highlights.map((item) => (
          <div key={item.id} className="game-card animate-fade-in" style={{ animationDelay: `${item.id * 0.1}s` }}>
            <div className="img-hover-container h-48 overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover img-hover"
              />
            </div>
            
            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium px-2 py-1 rounded bg-gaming-primary/20 text-gaming-primary">
                  {item.category}
                </span>
                <div className="flex items-center text-gray-400 text-xs">
                  <Clock size={12} className="mr-1" />
                  <span>{item.readTime}</span>
                </div>
              </div>
              
              <h3 className="font-bold mb-2 text-white line-clamp-2">{item.title}</h3>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {item.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="text-xs px-2 py-1 rounded-full bg-gaming-secondary/20 text-gray-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div className="flex justify-between text-gray-400 text-xs pt-2 border-t border-gaming-secondary/20">
                <div className="flex items-center">
                  <Eye size={12} className="mr-1" />
                  <span>{item.views} views</span>
                </div>
                <button className="text-gaming-primary hover:text-gaming-accent transition-colors">
                  Read more
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodaysHighlights;
