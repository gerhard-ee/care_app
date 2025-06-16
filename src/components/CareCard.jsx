import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const colorClasses = {
  blue: {
    bg: 'bg-blue-500',
    text: 'text-blue-600',
    border: 'border-blue-200',
    hover: 'hover:bg-blue-600',
    focus: 'focus:ring-blue-500',
    response: 'bg-blue-50 border-blue-200',
  },
  green: {
    bg: 'bg-green-500',
    text: 'text-green-600',
    border: 'border-green-200',
    hover: 'hover:bg-green-600',
    focus: 'focus:ring-green-500',
    response: 'bg-green-50 border-green-200',
  },
  red: {
    bg: 'bg-red-500',
    text: 'text-red-600',
    border: 'border-red-200',
    hover: 'hover:bg-red-600',
    focus: 'focus:ring-red-500',
    response: 'bg-red-50 border-red-200',
  },
  purple: {
    bg: 'bg-purple-500',
    text: 'text-purple-600',
    border: 'border-purple-200',
    hover: 'hover:bg-purple-600',
    focus: 'focus:ring-purple-500',
    response: 'bg-purple-50 border-purple-200',
  },
};

function CareCard({ id, title, subtitle, color, questions, onAiRequest, isLoading }) {
  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isResponseVisible, setIsResponseVisible] = useState(false);

  const colors = colorClasses[color];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await onAiRequest(id, userInput);
    if (response) {
      setAiResponse(response);
      setIsResponseVisible(true);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 flex flex-col">
      <div className="flex items-center mb-4">
        <div
          className={`${colors.bg} text-white rounded-full h-12 w-12 flex items-center justify-center text-2xl font-bold mr-4 shrink-0`}
        >
          {title[0]}
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          <p className={`${colors.text} font-semibold`}>{subtitle}</p>
        </div>
      </div>

      <div className="space-y-4 flex-grow">
        <p className="font-medium text-gray-700">Key questions:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          {questions.map((question, index) => (
            <li key={index}>{question}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className={`font-bold ${colors.text} mb-2`}>
          ✨ AI Assistant: {title} Analysis
        </h4>
        <p className={`text-sm ${colors.text} mb-3`}>
          Describe your project, and the AI will help analyze the {title.toLowerCase()} aspects.
        </p>
        
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:outline-none"
            rows="2"
            placeholder={`e.g., 'Building a real-time ${title.toLowerCase()} analysis system...'`}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`mt-2 w-full ${colors.bg} text-white font-bold py-2 px-4 rounded-md ${colors.hover} transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLoading ? (
              <>
                <div className="spinner mr-2"></div>
                <span>Analyzing...</span>
              </>
            ) : (
              'Get AI Analysis'
            )}
          </button>
        </form>

        {isResponseVisible && aiResponse && (
          <div className={`mt-4 p-4 rounded-lg border ${colors.response}`}>
            <ReactMarkdown>{aiResponse}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default CareCard; 