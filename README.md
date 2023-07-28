# Social Media Website

**Welcome!** This is a social media website built with TypeScript, React, Express, MongoDB, and NodeJs. It allows users to connect with friends, share posts, and manage interactions through a like system.

## Features

- **Post Creation:** Users can create posts with text.

- **Like and Unlike Posts:** The platform incorporates a 'Like' feature, allowing users to appreciate posts. Users can also 'Unlike' posts to remove previous interactions.

- **Timestamp for Posts:** Each post displays the time it was originally posted, giving users context and relevance for each piece of content.

- **Responsive Design:** Website is built with a responsive design, allowing users to access the platform on various devices.

## Getting Started

Follow these instructions to set up the project on your local machine.

### Prerequisites

- Node.js (>= 14.x)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
    ```bash
   git clone https://github.com/AbdelrhmanReda17/Social-Media-Website
    ```
2. Navigate to the project directory:
   ```bash
     cd Social-Media-Website
    ```
#### Backend Installation:
  1. Open a terminal (or command prompt) and navigate to the "backend" folder.
        ```bash
        cd backend
        ```
  2. Run the following command to initialize a new Node.js project and install the required dependencies:
        ```bash
        npm install
        ```
  4. Create a file named `.env` in the "backend" folder. This file will store sensitive information like the MonogDb-URL / Port
  5. Inside the `.env` file, add the following lines and replace the placeholders with your actual Firebase configuration:
        ```bash
        PORT=4000 # Replace "4000" with the desired port number
        MongoURL=your_mongodb_connection_string # Replace "your_mongodb_connection_string" with the actual MongoDB connection URL
        ```
  6. To start the backend server, run:
        ```bash 
        npm start # The server should now be running and listening on the specified port.
        ```
  7. Run the application:
        ```bash
        npm start
        ```
#### Frontend Installation
  1. Open a terminal (or command prompt) and navigate to the "frontend" folder:
       ```bash
        cd frontend
        ```
  2. Run the following command to install the required dependencies:
       ```bash
        npm install
        ```
  3. To start the development server for the frontend, run:
        ```bash
        npm start
        ```
3. The development server should now be running, and you can access the social media website in your web browser at `http://localhost:3000`.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch with a descriptive name for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Create a pull request to the main repository's main branch.

## License
This project is licensed under the MIT License
