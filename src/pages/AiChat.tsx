
import React, { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from '@/components/ui/avatar';
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { BookmarkIcon, SendIcon, BotIcon, PlusCircleIcon, InfoIcon, MessageSquareIcon, GamepadIcon, Lightbulb } from 'lucide-react';

// Types for our chat
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  saved?: boolean;
  sources?: Source[];
}

interface Source {
  title: string;
  url: string;
}

// Suggested questions
const suggestedQuestions = [
  "Which games are similar to Elden Ring but easier?",
  "When is the next major update for Fortnite?",
  "How to rank up fast in Valorant?",
  "Summarize today's gaming news",
  "Suggest 3 new low-spec PC games",
  "Create a new strategy for LoL ranked mode"
];

const AiChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! I'm your gaming assistant. Ask me anything about games, strategies, or the latest news!",
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [quickMode, setQuickMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle sending a message
  const handleSendMessage = (content: string = inputMessage) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessageId = Date.now().toString();
    setMessages(prev => [
      ...(quickMode ? [prev[0]] : prev),
      {
        id: userMessageId,
        content,
        sender: 'user',
        timestamp: new Date(),
      }
    ]);
    
    setInputMessage('');
    setIsAiTyping(true);
    
    // Simulate AI thinking and response
    setTimeout(() => {
      generateAiResponse(content, userMessageId);
    }, 1500);
  };

  // Generate AI response - in a real app, this would call an API
  const generateAiResponse = (userMessage: string, userMessageId: string) => {
    // Mock AI response - in production this would be from an AI API
    let response: string;
    let sources: Source[] | undefined;
    
    // Demo responses based on keywords
    if (userMessage.toLowerCase().includes('elden ring')) {
      response = "Games like Elden Ring but easier include Dark Souls 3 with a more linear approach, Sekiro with its structured combat system, and Ghost of Tsushima for beautiful open-world samurai action without the brutal difficulty.";
      sources = [
        { title: "Best Souls-like Games in 2024", url: "#article/souls-like-games" },
        { title: "FromSoftware Games Ranked by Difficulty", url: "#article/from-software-ranking" }
      ];
    } else if (userMessage.toLowerCase().includes('valorant')) {
      response = "To rank up quickly in Valorant: 1) Master 2-3 agents thoroughly rather than playing many mediocrely, 2) Practice aim training daily with tools like Aimlabs, 3) Learn callouts and common angles for each map, 4) Play with a consistent team if possible, 5) Review your replays to identify mistakes.";
    } else if (userMessage.toLowerCase().includes('news') || userMessage.toLowerCase().includes('summarize')) {
      response = "Today's gaming highlights: 1) Sony announced PS5 Pro specifications with improved ray tracing, 2) Rockstar teased a GTA 6 gameplay trailer coming next month, 3) Riot Games revealed the new Valorant map 'Archipelago', 4) Nintendo Direct planned for next week with potential Zelda news.";
      sources = [
        { title: "Sony's PS5 Pro Announcement", url: "#news/ps5-pro" },
        { title: "GTA 6 Development Update", url: "#news/gta6-trailer" }
      ];
    } else if (userMessage.toLowerCase().includes('low-spec')) {
      response = "Three great new games for low-spec PCs: 1) Vampire Survivors - pixel roguelike with minimal system requirements, 2) Dave the Diver - charming pixel art adventure with modest hardware needs, 3) Balatro - addictive poker roguelike that runs on almost anything.";
    } else {
      response = "That's an interesting gaming question! While I don't have specific information on that topic right now, our gaming news section might have some related articles. Would you like me to suggest some alternatives to explore?";
    }
    
    setIsAiTyping(false);
    
    // Add AI response
    setMessages(prev => [
      ...prev,
      {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'ai',
        timestamp: new Date(),
        sources
      }
    ]);
  };

  // Save message to favorites
  const toggleSaveMessage = (id: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === id ? { ...msg, saved: !msg.saved } : msg
      )
    );
    
    toast({
      title: "Message saved",
      description: "This Q&A has been added to your favorites.",
    });
  };

  // Handle suggested question click
  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gaming-primary to-gaming-secondary/70">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <BotIcon className="text-purple-400 h-8 w-8" />
          <h1 className="text-3xl md:text-4xl font-bold text-white">Gaming Assistant</h1>
        </div>

        {/* Chat container */}
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Main chat area */}
          <div className="flex flex-col w-full lg:w-3/4 bg-gaming-secondary/20 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10">
            {/* Messages area */}
            <div className="flex-grow p-4 overflow-y-auto max-h-[60vh]">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <Avatar className={message.sender === 'ai' ? 'bg-purple-700' : 'bg-gray-600'}>
                          {message.sender === 'ai' ? (
                            <AvatarFallback>
                              <GamepadIcon className="h-5 w-5" />
                            </AvatarFallback>
                          ) : (
                            <AvatarFallback>U</AvatarFallback>
                          )}
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
            <div className="p-4 border-t border-white/10 bg-white/5">
              <div className="flex gap-2">
                <Textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about games, strategies, or news..."
                  className="min-h-[60px] resize-none bg-white/10 border-white/10 text-white"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button 
                  className="self-end"
                  onClick={() => handleSendMessage()}
                  disabled={isAiTyping || !inputMessage.trim()}
                >
                  <SendIcon className="h-4 w-4" />
                </Button>
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
          </div>
          
          {/* Sidebar with suggestions */}
          <div className="lg:w-1/4 bg-gaming-secondary/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="h-5 w-5 text-yellow-400" />
              <h2 className="text-lg font-semibold text-white">Suggested Questions</h2>
            </div>
            
            <div className="space-y-2">
              {suggestedQuestions.map((question, idx) => (
                <button
                  key={idx}
                  className="w-full text-left p-3 rounded-md bg-white/5 hover:bg-white/10 text-white/90 hover:text-white transition-colors border border-white/5 text-sm"
                  onClick={() => handleSuggestedQuestion(question)}
                >
                  {question}
                </button>
              ))}
            </div>
            
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquareIcon className="h-5 w-5 text-purple-400" />
                <h2 className="text-lg font-semibold text-white">Quick Tips</h2>
              </div>
              
              <ul className="list-disc list-inside text-sm text-white/80 space-y-2">
                <li>Ask for game recommendations based on your preferences</li>
                <li>Get quick tips for improving at specific games</li>
                <li>Save helpful answers by clicking the bookmark icon</li>
                <li>Enable Quick Q&A Mode for faster responses</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AiChat;
