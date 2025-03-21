# Offline Messaging API

A RESTful API for offline messaging built with NestJS, TypeScript, and MySQL.

## Features

- User authentication (register/login)
- Send and receive messages
- Block/unblock users
- View message history
- Activity logging
- Swagger API documentation

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd offline-messaging-api-nestJs
```

2. Install dependencies:
```bash
npm install
```

3. Create a MySQL database:
```sql
CREATE DATABASE chatmessage;
```

4. Configure environment variables:
- Copy `.env.example` to `.env`
- Update the values according to your environment

## Running the Application

1. Start the development server:
```bash
npm run start:dev
```

2. Access the API documentation:
- Open your browser and navigate to `http://localhost:3000/api-docs`

## API Endpoints

### Authentication
- POST /auth/register - Register a new user
- POST /auth/login - Login user

### Messages
- POST /messages - Send a message
- GET /messages?username=:username - Get messages with a specific user
- POST /messages/:id/read - Mark a message as read

### Blocks
- POST /block/:username - Block a user
- DELETE /block/:username - Unblock a user
- GET /block - Get list of blocked users

### Activity
- GET /activity - Get user activity log
