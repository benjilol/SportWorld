# Sports Events Website

## Description
This is a modern web application built with React, TypeScript, and Tailwind CSS that allows users to explore and manage sports events. The application features a responsive design and provides an intuitive interface for users to browse different sports events, view details, and interact with the platform.

## Technologies Used
- Frontend:
  - React
  - TypeScript
  - Tailwind CSS
  - Vite (Build tool)
- Backend:
  - Node.js
  - Prisma (ORM)
  - SQLite Database

## Features
- Browse sports events
- View detailed information about specific sports
- Responsive design for mobile and desktop
- Modern and intuitive user interface
- Real-time data updates
- User authentication

## Prerequisites
Before running this project, make sure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd project-js-final
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add necessary environment variables.

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

## Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Start the backend server:
```bash
npm run server
```

The application will be available at `http://localhost:5173`

## Project Structure
```
project-js-final/
├── src/               # Frontend source files
│   ├── components/    # React components
│   ├── pages/        # Page components
│   ├── assets/       # Static assets
│   └── styles/       # CSS styles
├── server/           # Backend server files
├── prisma/           # Database schema and migrations
├── public/           # Public assets
└── ...configuration files
```

## Development
- The project uses ESLint for code linting
- TypeScript for type checking
- Tailwind CSS for styling
- Vite for fast development and building

## Building for Production

To create a production build:
```bash
npm run build
```

The built files will be in the `dist` directory.

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
This project is licensed under the MIT License.