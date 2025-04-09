# Job Listing Application

A modern, accessible job listing application built with React, TypeScript, and Vite. This application allows users to browse job listings, filter by job type, search for specific positions, and apply for jobs.

## Features

- Fetch jobs from the TheirStack API
- Display job listings with key details (title, company, location, type)
- Filter job listings by type
- Search for specific job titles
- Apply for jobs
- Responsive design for mobile and desktop

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```
3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
3. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

4. Update the `.env` file with your TheirStack API key:

```
VITE_API_KEY=your_api_key_here
```

### Development

Start the development server:

```bash
npm run dev
```

### Testing

#### Unit Tests

Run unit tests:

```bash
npm run test
```

#### Acceptance Tests

Run acceptance tests:

```bash
npm run test:acc
```

The acceptance tests verify:

1. Job listings are displayed with all required details (title, company, location, type)
2. The application makes API requests to fetch jobs from TheirStack

## Architecture

The application follows a clean architecture approach, present in the `src/modules` directory:

- **Domain**: Contains the core business logic and entities
- **Application**: Contains the use cases and application services
- **Infrastructure**: Contains the implementations of repositories and external services

Everything related to React is in the `src/sections` directory.

## License

This project is licensed under the MIT License.