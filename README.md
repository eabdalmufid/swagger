# Affidev API - Swagger

## Description
A simple Anime API with user registration, email notifications, and Telegram notifications.

## Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with the required environment variables
4. Start the server: `npm start`

## Environment Variables
- `MONGO_URI`: MongoDB connection URI
- `JWT_SECRET`: Secret key for JWT
- `EMAIL_USER`: Email address for sending notifications
- `EMAIL_PASS`: Password for the email address
- `TELEGRAM_BOT_TOKEN`: Telegram bot token
- `TELEGRAM_CHAT_ID`: Telegram chat ID

## Endpoints
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login a user
- `GET /api/auth/listuser`: List all users

- `GET /api/youtube/search`: Search for YouTube all, channel, playlist and video
- `GET /api/youtube/audio`: Get audio from YouTube link
- `GET /api/youtube/video`: Get video from YouTube link

## Swagger
API documentation is available at `/docs`
