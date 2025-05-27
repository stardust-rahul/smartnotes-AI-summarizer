# Smart Notes - AI-Powered Note Taking App
[Test Demo](stardust-smartnotes.netlify.app)

A modern note-taking application with AI-powered summarization capabilities, built with React, TypeScript, and Google Cloud Vertex AI.

## Features

- 📝 Create, edit, and delete notes
- 🤖 AI-powered text summarization using Google Cloud Vertex AI
- 🌓 Dark mode support
- 📱 Responsive design
- 💾 Local storage for notes persistence
- ⚡ Fast and modern UI with Framer Motion animations

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Google Cloud Vertex AI
- Supabase (for backend services)

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Cloud account with Vertex AI API enabled
- Supabase account

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Cloud Configuration (for Supabase Edge Functions)
GOOGLE_CLOUD_PROJECT=your_google_cloud_project_id
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/smart-notes.git
cd smart-notes
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Build for production:
```bash
npm run build
# or
yarn build
```

## Supabase Setup

1. Create a new Supabase project
2. Enable Edge Functions
3. Deploy the summarize function from the `supabase/functions` directory
4. Set up the required environment variables in your Supabase project settings

## Google Cloud Setup

1. Create a new Google Cloud project
2. Enable the Vertex AI API
3. Set up authentication credentials
4. Configure the project ID in your Supabase Edge Function environment variables

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 