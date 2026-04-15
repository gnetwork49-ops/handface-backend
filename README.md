# Handface Backend

A social media platform backend built with Node.js, Express, PostgreSQL, and Socket.io.

## Features

- User authentication (register/login)
- Profile management
- Posts (images, videos, text)
- Follow system
- Messaging
- Notifications
- Live streaming
- Marketplace
- Revenue system (subscriptions, tips)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up database:
- Ensure PostgreSQL is running
- Update `.env` with your database credentials
- Run `init.sql` to create tables

3. Start development server:
```bash
npm run dev
```

## Environment Variables

- PORT - Server port (default: 3000)
- JWT_SECRET - Secret key for JWT tokens
- DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD - Database config
- ALLOWED_ORIGINS - CORS allowed origins

## API Endpoints

- `/api/auth` - Authentication
- `/api/users` - User profiles
- `/api/posts` - Posts and feed
- `/api/followers` - Follow system
- `/api/messages` - Chat
- `/api/notifications` - Notifications
- `/api/videos` - Videos
- `/api/livestream` - Live streams
- `/api/market` - Marketplace
- `/api/subscription` - Premium plans
- `/api/payment` - Payments
- `/api/admin` - Admin dashboard

## Deploy

Use `npm start` for production. Supports deployment to Render, Railway, Heroku, etc.