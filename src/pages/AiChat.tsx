
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Avatar } from '@/components/ui/avatar';
import { AvatarFallback } from '@/components/ui/avatar';
import { BotIcon, GamepadIcon, Sparkles } from 'lucide-react';
import { useAiChat } from '@/hooks/useAiChat';
import MessageBubble from '@/components/ai-chat/MessageBubble';
import SuggestedQuestions from '@/components/ai-chat/SuggestedQuestions';
import ChatInput from '@/components/ai-chat/ChatInput';
import { useAuth } from '@/hooks/useAuth';

const AiChat = () => {
  const { 
    messages, 
    inputMessage, 
    setInputMessage, 
    isAiTyping, 
    quickMode, 
    setQuickMode, 
    messagesEndRef, 
    handleSendMessage, 
    toggleSaveMessage,
    suggestedQuestions
  } = useAiChat();
  
  const { user } = useAuth();

  // Handle suggested question click
  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gaming-primary to-gaming-secondary/70">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="flex flex-col items-start gap-3 mb-6">
          <div className="flex items-center gap-3">
            <BotIcon className="text-purple-400 h-8 w-8" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {user ? `Hello, ${user.username}! What would you like to learn today?` : 'FireAssistant'}
            </h1>
          </div>
          <div className="flex items-center bg-purple-600/30 rounded-full px-4 py-1 text-white/90 text-sm">
            <Sparkles className="h-4 w-4 mr-2 text-yellow-300" />
            Powered by Google Gemini AI
          </div>
        </div>

        {/* Chat container */}
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Main chat area */}
          <div className="flex flex-col w-full lg:w-3/4 bg-gaming-secondary/20 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10">
            {/* Messages area */}
            <div className="flex-grow p-4 overflow-y-auto max-h-[60vh]">
              <div className="space-y-4">
                {messages.map((message) => (
                  <MessageBubble 
                    key={message.id}
                    message={message}
                    toggleSaveMessage={toggleSaveMessage}
                  />
                ))}
                
                {/* AI typing indicator */}
                {isAiTyping && (
                  <div className="flex justify-start">
                    <div className="flex gap-3 max-w-[80%]">
                      <div className="flex-shrink-0">
                        <Avatar className="bg-purple-700">
                          <AvatarFallback>
                            <GamepadIcon className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="p-4 rounded-lg bg-white/10 text-white">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-white/50 animate-pulse"></div>
                          <div className="w-2 h-2 rounded-full bg-white/50 animate-pulse delay-75"></div>
                          <div className="w-2 h-2 rounded-full bg-white/50 animate-pulse delay-150"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            {/* Input area */}
            <ChatInput
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
              handleSendMessage={() => handleSendMessage()}
              isAiTyping={isAiTyping}
              quickMode={quickMode}
              setQuickMode={setQuickMode}
            />
          </div>
          
          {/* Sidebar with suggestions */}
          <SuggestedQuestions 
            questions={suggestedQuestions}
            handleSuggestedQuestion={handleSuggestedQuestion}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AiChat;
