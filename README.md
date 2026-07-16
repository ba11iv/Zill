# Zill Backend

A TypeScript-based backend service for the Zill platform, providing intelligent financial protection and management features.

## Overview

Zill Backend is a Node.js Express server that powers the Zill application, offering APIs for financial data processing, AI-powered insights, and secure file handling.

## Features

- **Express.js Server** - Fast and lightweight REST API framework
- **Google GenAI Integration** - AI-powered financial insights and analysis
- **File Upload Handling** - Secure file upload management with Multer
- **CORS Support** - Cross-Origin Resource Sharing enabled
- **Environment Configuration** - Secure configuration management with dotenv

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.2.1
- **Language**: TypeScript
- **Key Dependencies**:
  - `@google/genai` - Google Generative AI API
  - `axios` - HTTP client for API requests
  - `multer` - File upload middleware
  - `cors` - CORS middleware
  - `dotenv` - Environment variable management

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Google GenAI API key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/ba11iv/Zill-Backend.git
cd Zill-Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add required environment variables:
```env
GOOGLE_GENAI_API_KEY=your_google_genai_api_key
PORT=3000
# Add other required environment variables
```

## Configuration

Configure the application using environment variables in a `.env` file:

- `GOOGLE_GENAI_API_KEY` - Your Google Generative AI API key
- `PORT` - Server port (default: 3000)
- Add other configuration as needed

## Usage

### Start the server in development mode:
```bash
npm start
```

The server will start on the configured PORT (default: 3000).

### Run tests:
```bash
npm test
```

## Project Structure

```
Zill-Backend/
├── index.js                 # Main entry point
├── package.json            # Project dependencies
├── .env                    # Environment variables (not committed)
└── README.md              # This file
```

## API Endpoints

Documentation for available endpoints will be added as the project develops. For now, refer to the source code in `index.js`.

## Development

This project uses:
- **Express.js** for routing and middleware
- **Multer** for handling file uploads
- **Axios** for making HTTP requests to external APIs
- **Google GenAI** for AI-powered features

## Contributing

Contributions are welcome! Please ensure that:
- Code follows the existing style
- All tests pass
- New features include appropriate documentation

## License

ISC

## Support

For issues, questions, or contributions, please open an issue or contact the maintainers.

---

**Project Created**: 2026
**Language**: TypeScript
**Status**: Active Development
