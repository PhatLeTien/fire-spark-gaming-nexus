
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { BookmarkIcon, GamepadIcon, InfoIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Message, Source } from '@/types/chat';

interface MessageBubbleProps {
  message: Message;
  toggleSaveMessage: (id: string) => void;
}

const MessageBubble = ({ message, toggleSaveMessage }: MessageBubbleProps) => {
  return (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex gap-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className="flex-shrink-0">
          <Avatar className={message.sender === 'ai' ? 'bg-purple-700' : 'bg-gray-600'}>
            <AvatarFallback>
              {message.sender === 'ai' ? (
                <GamepadIcon className="h-5 w-5" />
              ) : (
                'U'
              )}
            </AvatarFallback>
          </Avatar>
        </div>
        
        {/* Message bubble */}
        <div 
          className={`
            relative p-4 rounded-lg 
            ${message.sender === 'user' 
              ? 'bg-blue-600 text-white' 
              : 'bg-white/10 text-white border border-white/5'}
          `}
        >
          <div className="prose prose-invert text-white">
            <p className="whitespace-pre-wrap">{message.content}</p>
            
            {/* Sources */}
            {message.sources && message.sources.length > 0 && (
              <div className="mt-3 pt-2 border-t border-white/20">
                <p className="text-xs text-white/70 mb-1">Sources:</p>
                <div className="flex flex-wrap gap-2">
                  {message.sources.map((source, idx) => (
                    <a 
                      key={idx}
                      href={source.url}
                      className="inline-flex items-center px-2 py-1 text-xs rounded bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <InfoIcon className="h-3 w-3 mr-1" />
                      {source.title}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Actions */}
          {message.sender === 'ai' && (
            <div className="absolute top-2 right-2 flex gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 opacity-50 hover:opacity-100"
                      onClick={() => toggleSaveMessage(message.id)}
                    >
                      <BookmarkIcon 
                        className={`h-3 w-3 ${message.saved ? 'fill-yellow-400 text-yellow-400' : 'text-white'}`} 
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{message.saved ? 'Remove from favorites' : 'Save to favorites'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
