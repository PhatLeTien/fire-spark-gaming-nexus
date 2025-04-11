
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

// API endpoint
const API_URL = 'http://localhost:3000/api/ai';

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
  const handleSendMessage = async (content: string = inputMessage) => {
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
    
    try {
      // Gọi API
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: content }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      
      if (data.result) {
        // Thêm tin nhắn AI
        setMessages(prev => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            content: data.result,
            sender: 'ai',
            timestamp: new Date(),
            apiUrl: API_URL
          }
        ]);
      } else {
        // Trường hợp không có kết quả
        setMessages(prev => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            content: "Xin lỗi, tôi không thể xử lý yêu cầu của bạn lúc này. Vui lòng thử lại sau.",
            sender: 'ai',
            timestamp: new Date(),
          }
        ]);
      }
    } catch (error) {
      console.error('Error calling AI API:', error);
      
      // Thêm tin nhắn lỗi
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: "Đã xảy ra lỗi khi kết nối với AI. Vui lòng kiểm tra kết nối mạng và thử lại.",
          sender: 'ai',
          timestamp: new Date(),
        }
      ]);
    } finally {
      setIsAiTyping(false);
    }
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
