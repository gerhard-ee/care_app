import axios from 'axios';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta';
const MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.0-flash';

if (!API_KEY) {
  console.error('VITE_GEMINI_API_KEY is not set in environment variables');
}

const getPrompt = (section, userInput) => {
  const basePrompt = `As a senior data architect, analyze the following project description: "${userInput}".`;
  
  const prompts = {
    context: `${basePrompt} Based on the 'Context' pillar of the CARE framework, generate three key questions the project lead should be asking to clarify the 'Why'. Focus on business outcomes, urgency, and success metrics. Format the output as a bulleted list.`,
    assumptions: `${basePrompt} Based on the 'Assumptions' pillar of the CARE framework, identify three critical hidden assumptions that might exist in this project. For each assumption, explain the potential risk if it's wrong. Format the output as a bulleted list.`,
    risks: `${basePrompt} Based on the 'Risks & Restraints' pillar of the CARE framework, brainstorm a list of three potential risks (covering security, operational, and technical aspects) and suggest a possible mitigation strategy for each. Format the output as a bulleted list.`,
    evolution: `${basePrompt} Based on the 'Evolution' pillar of the CARE framework, suggest three ways this system might need to evolve in the next 3-5 years. Explain how the architecture can be designed now to accommodate these future changes. Format the output as a bulleted list.`
  };

  return prompts[section] || basePrompt;
};

export const callGemini = async (section, userInput) => {
  if (!API_KEY) {
    throw new Error('API key is not configured. Please set VITE_GEMINI_API_KEY in your environment variables.');
  }

  const prompt = getPrompt(section, userInput);
  const chatHistory = [{ role: 'user', parts: [{ text: prompt }] }];
  
  try {
    const response = await axios.post(
      `${API_BASE_URL}/models/${MODEL}:generateContent?key=${API_KEY}`,
      { contents: chatHistory },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Unexpected response structure from Gemini API');
    }

    // Check for safety ratings or other block reasons
    if (response.data.candidates[0].finishReason === 'SAFETY') {
      throw new Error('The generated response was blocked for safety reasons. Please try rephrasing your project description.');
    }

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(`API Error: ${error.response.data.error?.message || error.response.statusText}`);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response received from the API. Please check your internet connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Request Error: ${error.message}`);
    }
  }
}; 