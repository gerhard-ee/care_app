# CARE Framework Web Application

A Single Page Application (SPA) that implements the CARE Framework for Data Architects, featuring an AI-powered assistant using Google's Gemini API.

## Features

- Interactive CARE Framework cards (Context, Assumptions, Risks & Restraints, Evolution)
- AI-powered assistance for each framework pillar
- Modern, responsive design using Tailwind CSS
- Real-time AI responses using Google's Gemini API

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Google Cloud Platform (GCP) account
- Basic knowledge of web development

## Getting Started

1. Clone this repository:
```bash
git clone <your-repo-url>
cd care_app
```

2. Install dependencies:
```bash
npm install
```

3. Set up your Google Cloud Project and API Key:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select an existing one
   - Enable the Gemini API for your project
   - Create API credentials:
     - Go to "APIs & Services" > "Credentials"
     - Click "Create Credentials" > "API Key"
     - Copy your API key
   - Restrict your API key (recommended):
     - In the API key settings, restrict it to only the Gemini API
     - Add application restrictions (HTTP referrers) if needed

4. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

5. Add your Gemini API key to the `.env` file:
```
VITE_GEMINI_API_KEY=your_api_key_here
```

6. Start the development server:
```bash
npm run dev
```

7. Build for production:
```bash
npm run build
```

## Security Considerations

- Never commit your `.env` file or expose your API key
- The API key is restricted to only the Gemini API
- All API calls are made server-side to protect the API key
- Input validation is implemented to prevent injection attacks

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Project Structure

```
care_app/
├── src/
│   ├── components/     # React components
│   ├── services/       # API and other services
│   ├── styles/         # Global styles
│   ├── utils/          # Utility functions
│   └── App.jsx         # Main application component
├── public/            # Static assets
├── index.html         # Entry HTML file
├── vite.config.js     # Vite configuration
├── .env.example       # Example environment variables
├── .gitignore        # Git ignore file
└── package.json      # Project dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 