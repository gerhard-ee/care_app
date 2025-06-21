# CARE Framework Web Application

A static HTML application that implements the CARE Framework for Data Architects, featuring an AI-powered co-pilot using Google's Gemini API.

## Features

- Interactive CARE Framework cards (Context, Assumptions, Risks & Restraints, Evolution)
- AI-powered co-pilot for strategic insights
- Modern, responsive design using Tailwind CSS
- Real-time AI responses using Google's Gemini API
- Clean, centralized interface for project analysis

## Prerequisites

- A modern web browser
- A Google Cloud Platform (GCP) account
- Basic knowledge of web development (for customization)

## Getting Started

1. Clone this repository:
```bash
git clone https://github.com/gerhard-ee/care_app.git
cd care_app
```

2. Set up your Google Cloud Project and API Key:
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

3. Add your Gemini API key to the application:
   - Open `index.html` in a text editor
   - Find the line: `const apiKey = "";`
   - Replace the empty string with your API key: `const apiKey = "your_api_key_here";`

4. Start the development server:
```bash
npm run dev
```
   Or simply open `index.html` in your web browser.

## Usage

1. **Describe Your Project**: Enter a description of your data project in the text area
2. **Generate Insights**: Click on any of the four CARE framework buttons (Context, Assumptions, Risks, Evolution)
3. **Review Results**: The AI will generate strategic insights based on the CARE framework principles

## Security Considerations

- **Important**: The API key is currently embedded in the HTML file. For production use, consider:
  - Using environment variables with a backend service
  - Implementing API key restrictions in Google Cloud Console
  - Using a proxy service to protect your API key
- Input validation is implemented to prevent injection attacks
- Error messages are user-friendly but don't expose sensitive information

## Development

- `npm run dev` - Start development server (Python HTTP server)
- `npm run preview` - Preview the application
- `npm run format` - Format code with Prettier

## Project Structure

```
care_app/
├── index.html          # Main application file
├── public/            # Static assets
│   └── favicon.svg    # Application icon
├── README.md          # Project documentation
├── package.json       # Project configuration
└── .gitignore        # Git ignore file
```

## Customization

The application is built with vanilla HTML, CSS, and JavaScript, making it easy to customize:

- **Styling**: Modify the Tailwind CSS classes or add custom CSS
- **Functionality**: Update the JavaScript functions in the `<script>` section
- **Content**: Edit the CARE framework questions and descriptions
- **AI Prompts**: Modify the `getPrompt()` function to change AI behavior

## Deployment

Since this is a static HTML application, you can deploy it to any static hosting service:

- **GitHub Pages**: Push to a GitHub repository and enable Pages
- **Netlify**: Drag and drop the folder to Netlify
- **Vercel**: Connect your GitHub repository
- **AWS S3**: Upload files to an S3 bucket with static website hosting
- **Any web server**: Simply upload the files to your web server

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions:
1. Check the browser console for error messages
2. Verify your API key is correctly configured
3. Ensure the Gemini API is enabled in your Google Cloud project
4. Open an issue on GitHub for bugs or feature requests 