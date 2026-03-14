# React & Node.js Developer Portfolio

A modern, high-performance developer portfolio built with a React frontend and an Express Node.js backend. This portfolio features a sleek, dark-themed space aesthetic with cyan and purple neon bloom effects, and it dynamically integrates with the GitHub API to showcase your latest repositories and statistics.

![Clean Architecture](https://img.shields.io/badge/Architecture-Clean-brightgreen)
![React](https://img.shields.io/badge/Frontend-React_18-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js_Express-green)

## Features

- **Live GitHub Integration**: Instead of hardcoding projects, the backend proxies requests to the GitHub API to fetch your profile statistics, pinned/key projects, and latest repositories dynamically.
- **Performance Optimized**: The Express backend uses `node-cache` to cache GitHub API responses for 1 hour, circumventing rate limits and ensuring lightning-fast load times.
- **Premium Dark Aesthetics**: Styled with a cinematic deep-space blue/black void background with electric cyan hover interactions and glassmorphism elements. Text is rendered using the sleek `Iosevka Charon` monospace font.
- **Mac Terminal UI**: Selected project cards are styled like Mac OS terminal windows, complete with red/yellow/green control dots.
- **Responsive Layout**: Designed to look great on desktops, tablets, and phones.

## Project Structure

This project uses a monorepo-style structure, housing both the frontend client and the backend server in the same repository.

```
portfolio/
├── client/                 # React Frontend
│   ├── public/             # Static assets (index.html, favicon.ico)
│   ├── src/
│   │   ├── components/     # Reusable UI components (Hero, Navbar, Projects, etc.)
│   │   ├── hooks/          # Custom React hooks (e.g., useGitHub)
│   │   ├── styles/         # Global styling (globals.css)
│   │   ├── App.js          # Main application component
│   │   └── index.js        # React entry point
│   └── package.json        
├── server/                 # Express Backend
│   └── index.js            # Main backend server file
├── package.json            # Root package configuration (commands and root dependencies)
└── README.md
```

## Tech Stack

**Frontend (`/client`)**
* React 18
* Vanilla CSS (CSS Variables, Flexbox/Grid, Animations)

**Backend (`/server`)**
* Node.js
* Express
* Axios
* Node-cache
* Cors & Dotenv

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. **Install all dependencies concurrently:**
   This command installs dependencies for both the root (server) and the `client/` folder.
   ```bash
   npm run install:all
   ```

3. **Configure the Environment:**
   Create a `.env` file in the root directory and add your GitHub username and an optional Personal Access Token (PAT) to prevent arbitrary rate limiting:
   ```env
   GITHUB_USERNAME=your_username_here
   GITHUB_TOKEN=your_personal_access_token_here
   PORT=5000
   ```

4. **Run the Application Locally:**
   This will start both the Express backend on port 5000 and the React development server on port 3000 simultaneously.
   ```bash
   npm run dev
   ```

## Customization

To personalize the portfolio:

*   **Global Styles**: Modify colors, fonts, and base variables in `client/src/styles/globals.css`.
*   **Key Projects**: In `client/src/components/KeyProjects.js`, update the hardcoded "Things I've Built" projects to point to specific URLs or details you want to highlight independent of GitHub repos.
*   **Contact Info**: Update your email address and social links in `client/src/components/Contact.js`.
*   **Hero Text**: Modify your name, roles, or the typewriter text sequence directly in `client/src/components/Hero.js`.

## Deployment

The repository is configured to easily build the React app. 
Run `npm run build` from the root directory to generate the production-ready React client inside `client/build/`. You can serve this static directory using the Express server for full-stack deployments (like on Render or Heroku) or host the frontend separately on Vercel/Netlify pointing to a deployed backend URL.

## License

This project is open-source and available under the MIT License.
