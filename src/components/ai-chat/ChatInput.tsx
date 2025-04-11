
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { SendIcon, InfoIcon, Mic, MicOff } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ChatInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  handleSendMessage: () => void;
  isAiTyping: boolean;
  quickMode: boolean;
  setQuickMode: (mode: boolean) => void;
}

const ChatInput = ({ 
  inputMessage, 
  setInputMessage, 
  handleSendMessage, 
  isAiTyping,
  quickMode,
  setQuickMode
}: ChatInputProps) => {
  const [isListening, setIsListening] = useState(false);

  const toggleVoiceInput = () => {
    // In a real implementation, this would integrate with Web Speech API
    setIsListening(!isListening);
    
    if (!isListening) {
      // Start listening - simplified mock version
      setTimeout(() => {
        setInputMessage(inputMessage + " (Voice input would appear here)");
        setIsListening(false);
      }, 2000);
    }
  };

  return (
    <div className="p-4 border-t border-white/10 bg-white/5">
      <div className="flex gap-2">
        <Textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask me anything about games, news, science..."
          className="min-h-[60px] resize-none bg-white/10 border-white/10 text-white"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <div className="flex flex-col gap-2 self-end">
          <Button
            size="icon"
            variant="ghost"
            className="bg-white/10 hover:bg-white/20"
            onClick={toggleVoiceInput}
          >
            {isListening ? <MicOff className="h-4 w-4 text-red-400" /> : <Mic className="h-4 w-4" />}
          </Button>
          <Button 
            onClick={() => handleSendMessage()}
            disabled={isAiTyping || !inputMessage.trim()}
          >
            <SendIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Quick mode toggle */}
      <div className="flex items-center mt-2 text-white/70 text-sm">
        <label className="flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            className="sr-only" 
            checked={quickMode} 
            onChange={() => setQuickMode(!quickMode)}
          />
          <div className={`w-9 h-5 rounded-full transition ${quickMode ? 'bg-purple-600' : 'bg-white/20'} relative`}>
            <div className={`absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform ${quickMode ? 'translate-x-4' : 'translate-x-0'}`}></div>
          </div>
          <span className="ml-2">Quick Q&A Mode</span>
        </label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <InfoIcon className="h-4 w-4 ml-1" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Only keeps the latest question and answer for faster responses</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ChatInput;
