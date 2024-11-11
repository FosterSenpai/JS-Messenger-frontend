# Regional Messenger
Foster Rae.  
MSA 106 Assessment 3

## Overview

Regional Messenger is a web application developed as part of a school project. It allows users to register, log in, and post messages based on their location (city, region, country).  
 The application is built using a microservices architecture with a React frontend and Node.js backend services.

## Features

- User registration and login
- Post messages based on location
- View and interact with messages in different regions
- Upvote and downvote messages and replies

## Technologies Used

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **Material-UI**: A popular React UI framework with a set of components that follow Google's Material Design guidelines.

### Backend

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A minimal and flexible Node.js web application framework.
- **cors**: A Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- **dotenv**: A zero-dependency module that loads environment variables from a `.env` file into `process.env`.
- **mysql2**: A MySQL client for Node.js with a focus on performance.
- **bcrypt**: A library to help hash passwords.

### Database

- **Google Cloud SQL**: A fully-managed relational database service for MySQL.

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed on your machine.
- **npm**: Node Package Manager, included with Node.js.
- **Google Cloud SQL**: Set up a Google Cloud SQL instance for the database.

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/regional-messenger.git
   cd regional-messenger
2. Install dependencies for the frontend:
   ```sh
   cd frontend
   npm install
3. Install dependencies for the backend services:
   ```sh
   cd ../backend/services/user-service
   npm install
   cd ../message-service
   npm install

### Running the Application

#### Frontend

1. Navigate to the `frontend` directory:
   ```sh
   cd frontend
2. Start the development server:
   ```sh
   npm start
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Backend Services

1. Navigate to the `backend/services/user-service` directory:
   ```sh
   cd backend/services/user-service
   ```
2. Start the user service:
   ```sh
   npm run dev
3. Navigate to the `backend/services/message-service` directory:
   ```sh
   cd ../message-service
   ```
4. Start the message service:
   ```sh
   npm run dev
   ```

#### Environment Variables
Create a .env file in the backend/services/user-service and backend/services/message-service directories with the following content:
   ```sh
   DB_HOST=your-google-cloud-sql-host
   DB_USER=your-database-user
   DB_NAME=your-database-name
   DB_PASSWORD=your-database-password  
   ```

### Deployment
The application is deployed using Render. The frontend and backend services are hosted separately on Render, and the database is hosted on Google Cloud SQL.

### Security Considerations
During the development of this project, some vulnerabilities were identified in the dependencies. Given the time constraints and the nature of the project, the decision was made to ignore these vulnerabilities.

### Libraries and Tools used
#### Frontend
- React: For building the user interface.
- Material-UI: For styling the components.

#### Backend
- Node.js: For building the backend services.
- Express: For API routing.
- cors: For cross-origin resource sharing.
- dotenv: For loading environment variables.
- mysql2: For connecting to the MySQL database.
- bcrypt: For hashing passwords.
- nodemon: For automatically restarting the server during development.