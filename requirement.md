
# Project Requirements

## Overview
This document outlines the requirements and dependencies needed for the development and deployment of the project.

## Dependencies

### Node.js
- **Express**: Used for setting up the server.
- **Body-Parser**: Middleware to parse incoming request bodies.
- **Twilio**: For SMS and call functionalities.
- **Plivo**: For additional telecommunication capabilities.
- **Node Telegram Bot API**: For Telegram bot interaction.
- **Discord.js**: For Discord bot functionality.

### Environment Variables
Ensure the following environment variables are set:

- `TWILIO_ACCOUNT_SID`: Twilio Account SID.
- `TWILIO_API_KEY`: Twilio API Key.
- `TWILIO_API_SECRET`: Twilio API Secret.
- `TWILIO_NUMBER`: Twilio phone number.
- `PLIVO_AUTH_ID`: Plivo Auth ID.
- `PLIVO_AUTH_TOKEN`: Plivo Auth Token.
- `DESTINATION_NUMBER`: Destination phone number.
- `TELEGRAM_BOT_TOKEN`: Telegram bot token.

### Database
- **quick.db**: In-memory database used for Discord.js bot tracking.

## Development
- Ensure you have Node.js and npm installed.
- Set up environment variables using Replit's Secrets manager.

## Deployment
- Bind the server to `0.0.0.0` and use port `5000`.
- Ensure all dependencies listed in `package.json` are installed.
