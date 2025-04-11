
import React from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, Star, BookOpen, MessageSquare } from 'lucide-react';

const QuickAccess = () => {
  const sections = [
    {
      name: 'News',
      icon: <Newspaper className="h-6 w-6" />,
      color: 'from-blue-600 to-blue-400',
      path: '/news'
    },
    {
      name: 'Reviews',
      icon: <Star className="h-6 w-6" />,
      color: 'from-yellow-600 to-yellow-400',
      path: '/reviews'
    },
    {
      name: 'Guides',
      icon: <BookOpen className="h-6 w-6" />,
      color: 'from-green-600 to-green-400',
      path: '/guides'
    },
    {
      name: 'AI Chat',
      icon: <MessageSquare className="h-6 w-6" />,
      color: 'from-gaming-accent to-pink-400',
      path: '/ai-chat'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {sections.map((section) => (
          <Link 
            key={section.name} 
            to={section.path}
            className="group relative overflow-hidden rounded-xl card-hover bg-gaming-secondary/20 hover:bg-gaming-secondary/30"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-r rounded-xl" />
            
            <div 
              className={`absolute bottom-0 left-0 h-1 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 bg-gradient-to-r ${section.color}`}
            />
            
            <div className="flex flex-col items-center justify-center p-6">
              <div className={`p-3 rounded-full bg-gradient-to-br ${section.color} mb-3 transform transition-transform group-hover:scale-110 duration-300`}>
                {section.icon}
              </div>
              <h3 className="text-lg font-medium text-white group-hover:text-white">{section.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickAccess;
