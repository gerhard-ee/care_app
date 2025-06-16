import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CareCard from './components/CareCard';
import { callGemini } from './services/geminiService';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const handleAiRequest = async (section, userInput) => {
    if (!userInput.trim()) {
      toast.error('Please describe your project first.');
      return null;
    }

    setIsLoading(true);
    try {
      const response = await callGemini(section, userInput);
      return response;
    } catch (error) {
      toast.error(error.message || 'Failed to get AI response');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const careSections = [
    {
      id: 'context',
      title: 'Context',
      subtitle: 'Start with \'Why\'',
      color: 'blue',
      questions: [
        'What business outcome does this drive?',
        'Why are we doing this now? What\'s the urgency?',
        'How will we measure success?',
        'Who is the ultimate consumer of this data?'
      ]
    },
    {
      id: 'assumptions',
      title: 'Assumptions',
      subtitle: 'Uncover Hidden Risks',
      color: 'green',
      questions: [
        'What are we assuming about the data\'s quality, volume, or schema?',
        'What are we assuming about user behavior or skills?',
        'What happens if this assumption is wrong?'
      ]
    },
    {
      id: 'risks',
      title: 'Risks & Restraints',
      subtitle: 'Define Boundaries',
      color: 'red',
      questions: [
        'What are the non-functional requirements (Security, Latency)?',
        'What is the operational budget for this system?',
        'What does failure look like, and how do we recover?'
      ]
    },
    {
      id: 'evolution',
      title: 'Evolution',
      subtitle: 'Plan for the Future',
      color: 'purple',
      questions: [
        'How will this system need to adapt in the next 2-5 years?',
        'What\'s the most likely change request we\'ll get soon?',
        'How do we avoid painting ourselves into a corner?'
      ]
    }
  ];

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto p-4 md:p-8 lg:p-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            The CARE Framework
          </h1>
          <p className="text-lg md:text-xl text-gray-700">
            A Strategic Guide for Modern Data Architects
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {careSections.map((section) => (
            <CareCard
              key={section.id}
              {...section}
              onAiRequest={handleAiRequest}
              isLoading={isLoading}
            />
          ))}
        </div>

        <footer className="text-center mt-12 text-gray-600">
          <p>
            Apply the CARE framework to build data solutions that are robust,
            relevant, and ready for tomorrow.
          </p>
        </footer>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App; 