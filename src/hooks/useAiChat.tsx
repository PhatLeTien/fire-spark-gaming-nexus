
import { useState, useRef, useEffect } from 'react';
import { Message } from '@/types/chat';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

// Updated suggested questions to cover broader topics
const suggestedQuestions = [
  "What are the best games similar to Elden Ring but easier?",
  "Explain quantum computing in simple terms",
  "Can you suggest birthday gift ideas for a gamer?",
  "How to fix FPS drops in Valorant?",
  "Summarize today's gaming news",
  "What's the capital of Iceland and some interesting facts about it?"
];

export const useAiChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! I'm FireAssistant. Ask me anything about games, technology, science, or anything else you're curious about!",
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [quickMode, setQuickMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();

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
    let sources: { title: string; url: string; }[] | undefined;
    
    const lowerCaseMsg = userMessage.toLowerCase();
    
    // Enhanced demo responses for various topics
    if (lowerCaseMsg.includes('elden ring') || lowerCaseMsg.includes('games similar')) {
      response = "Games like Elden Ring but easier include Dark Souls 3 with a more linear approach, Sekiro with its structured combat system, and Ghost of Tsushima for beautiful open-world samurai action without the brutal difficulty.";
      sources = [
        { title: "Best Souls-like Games in 2024", url: "#article/souls-like-games" },
        { title: "FromSoftware Games Ranked by Difficulty", url: "#article/from-software-ranking" }
      ];
    } else if (lowerCaseMsg.includes('valorant')) {
      response = "To fix FPS drops in Valorant:\n\n1. Update your graphics drivers\n2. Lower in-game settings, especially shadows and effects\n3. Close background applications\n4. Set Valorant to high priority in Task Manager\n5. Make sure your PC meets the recommended requirements";
    } else if (lowerCaseMsg.includes('news') || lowerCaseMsg.includes('summarize')) {
      response = "Today's gaming highlights:\n\n1. Sony announced PS5 Pro specifications with improved ray tracing\n2. Rockstar teased a GTA 6 gameplay trailer coming next month\n3. Riot Games revealed the new Valorant map 'Archipelago'\n4. Nintendo Direct planned for next week with potential Zelda news";
      sources = [
        { title: "Sony's PS5 Pro Announcement", url: "#news/ps5-pro" },
        { title: "GTA 6 Development Update", url: "#news/gta6-trailer" }
      ];
    } else if (lowerCaseMsg.includes('quantum')) {
      response = "Quantum computing in simple terms: Regular computers use bits (0s and 1s). Quantum computers use quantum bits or 'qubits' that can exist in multiple states simultaneously through a phenomenon called superposition.\n\nImagine a regular bit as a coin showing either heads or tails. A qubit is like a spinning coin that's both heads AND tails until you look at it. This allows quantum computers to process certain types of information exponentially faster than regular computers.";
    } else if (lowerCaseMsg.includes('capital of iceland')) {
      response = "The capital of Iceland is Reykjavík. It's the northernmost capital of a sovereign state in the world.\n\nInteresting facts about Iceland:\n\n1. It's powered almost entirely by renewable energy (geothermal and hydroelectric)\n2. It has no standing army\n3. Most Icelanders believe in elves or are open to their existence\n4. You can see the Northern Lights from September to April\n5. Its landscapes were used to film scenes for Game of Thrones";
    } else if (lowerCaseMsg.includes('birthday') || lowerCaseMsg.includes('gift')) {
      response = "Great gift ideas for a gamer:\n\n• Gaming peripherals: A high-quality mouse, mechanical keyboard, or gaming headset\n• Gaming gift cards for their preferred platform (Steam, PlayStation, Xbox, Nintendo)\n• Gaming merchandise like figures or clothing from their favorite games\n• A gaming subscription service like Game Pass or PlayStation Plus\n• Custom controller or console skins\n• A comfortable gaming chair if your budget allows\n• RGB lighting strips for their gaming setup\n\nPersonalized gifts based on specific games they love are always appreciated!";
    } else {
      response = "That's an interesting question! While I don't have specific information on that topic right now, I'd be happy to learn more about what you're looking for. Could you provide more details or try asking in a different way?";
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

  return {
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
  };
};
