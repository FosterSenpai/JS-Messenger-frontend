# Regional Messenger

## Overview

Regional Messenger is a web application developed as part of a school project. It allows users to register, log in, and post messages based on their location (city, region, country). The application is built using a microservices architecture with a React frontend and Node.js backend services.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## Running the Components

### Frontend

1. Navigate to the `frontend` directory:
   ```sh
   cd frontend
2. Install the dependencies:
   ```sh
   npm install
2. Start the development server:
   ```sh
   npm start
### Backend Services
##### Downloading Repositories
To run the backend services, you need to download the other repositories from the following URLs:

User Service: https://github.com/yourusername/user-service-repo  
Message Service: https://github.com/yourusername/message-service-repo  

Clone these repositories into the appropriate directories before running the services.
(Put them in a directory with the front end.)
#### User-Service
1. Navigate to the `user-service` directory:
   ```sh
   cd user-service
2. Install the dependencies:
   ```sh
   npm install
2. Start the service:
   ```sh
   npm run dev
#### Message-Service
1. Navigate to the `message-service` directory:
   ```sh
   cd message-service
2. Install the dependencies:
   ```sh
   npm install
2. Start the service:
   ```sh
   npm run dev
## Security Considerations

During the development of this project, some vulnerabilities were identified in the dependencies. Given the time constraints and the nature of the project, the decision was made to ignore these vulnerabilities. The vulnerabilities are as follows:

1. nth-check:

    Severity: High  
    Issue: Inefficient Regular Expression Complexity  
    Impact: Could potentially be exploited to cause   performance issues.  
1. postcss:

    Severity: Moderate  
    Issue: Line return parsing error  
    Impact: Could potentially be exploited to cause unexpected behavior.  


These vulnerabilities are not expected to pose a significant risk for this school project, which is not intended for production use.  

## Libraries and Tools Used

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **Material-UI**: A popular React UI framework with a set of components that follow Google's Material Design guidelines.

### Backend

- **Express**: A minimal and flexible Node.js web application framework.
- **cors**: A Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- **dotenv**: A zero-dependency module that loads environment variables from a `.env` file into `process.env`.
- **mysql2**: A MySQL client for Node.js with a focus on performance.
- **bcrypt**: A library to help hash passwords.
- **nodemon**: A tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

### Development Tools

- **npm**: A package manager for JavaScript, included with Node.js.
- **Visual Studio Code**: A source-code editor made by Microsoft for Windows, Linux, and macOS.

### Other

- **Git**: A distributed version-control system for tracking changes in source code during software development.
- **GitHub**: A provider of Internet hosting for software development and version control using Git.