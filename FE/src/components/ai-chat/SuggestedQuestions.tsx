
import React from 'react';
import { Lightbulb, MessageSquareIcon } from 'lucide-react';

interface SuggestedQuestionsProps {
  questions: string[];
  handleSuggestedQuestion: (question: string) => void;
}

const SuggestedQuestions = ({ questions, handleSuggestedQuestion }: SuggestedQuestionsProps) => {
  return (
    <div className="lg:w-1/4 bg-gaming-secondary/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="h-5 w-5 text-yellow-400" />
        <h2 className="text-lg font-semibold text-white">Suggested Questions</h2>
      </div>
      
      <div className="space-y-2">
        {questions.map((question, idx) => (
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
          <li>Ask about anything - gaming, science, news, etc.</li>
          <li>Get quick tips for improving at specific games</li>
          <li>Ask follow-up questions to dive deeper</li>
          <li>Save helpful answers by clicking the bookmark icon</li>
          <li>Enable Quick Q&A Mode for faster responses</li>
        </ul>
      </div>
    </div>
  );
};

export default SuggestedQuestions;
