

# Frontend for Personal Blog

This is the frontend for Personal Blog, a React-based web application built with Vite, integrating Material UI, Axios, and JWT authentication. The application communicates with a backend to manage user authentication, post creation, and subscription plans.

## Features
- React with React Router for navigation
- Material UI for UI components and styling
- Axios for API requests
- JWT authentication with token storage in HTML
- Protected routes based on user authentication status
- Creator-specific routes and functionality
- User profile management
- Post creation and editing for creators
- Subscription plan management



## Running the Application
```sh
npm run dev
# or
yarn dev
```

## Project Structure
```
.
├── src
│   ├── api/               # Axios API setup
│   ├── components/        # Reusable UI components
│   ├── pages/             # Route-based components
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Entry point
│   └── App.css            # Global styles
├── public/                # Static assets
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
└── README.md              # Documentation
```

## Routes
| Route | Description |
|--------|-------------|
| `/` | Home page (Protected) |
| `/login` | User login (Redirects if authenticated) |
| `/register` | User registration |
| `/logout` | Logs out user (Protected) |
| `/user/:username` | User profile (Protected) |
| `/creator/subscription_plan/` | Manage subscription plan (Protected) |
| `/creator/edit/` | Edit creator profile (Creator-only) |
| `/post/create` | Create a post (Creator-only) |
| `/post/edit/:id/` | Edit a post (Creator-only) |
| `/404` | Not found page |

## Authentication Flow
- On app load, the `useEffect` in `App.jsx` checks authentication via an API request.
- Protected routes require authentication, and some require creator status.
- Tokens are handled in requests for secure access to protected resources.
