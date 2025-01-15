# Booksearch Application Refactor: PERN to MERN Stack

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Authentication](#authentication)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Description

This project is a refactored version of an original PERN (PostgreSQL, Express, React, Node.js) stack application. The refactoring process involved migrating the backend database from PostgreSQL to MongoDB, thereby transitioning the application to a MERN (MongoDB, Express, React, Node.js) stack. Additionally, the JWT (JSON Web Token) authentication mechanism was revamped to enhance security and efficiency. The application leverages the Google Books API to allow users to search for books and add them to their personal lists when logged in. Both server-side and client-side components were updated to align with the MERN architecture.

## Features

- **User Authentication:** Secure login and registration using JWT.
- **Google Books Integration:** Search for books using the Google Books API and add them to personal lists.
- **Responsive UI:** Built with React and Vite for a fast and responsive user experience.
- **CRUD Operations:** Full create, read, update, and delete functionalities.
- **Database Integration:** Migrated from PostgreSQL to MongoDB for scalable data management.
- **Enhanced Security:** Improved handling of JWT tokens to safeguard user data.

## Technologies Used

- **Frontend:**
  - React
  - Bootstrap
  - Vite
- **Backend:**
  - Node.js
  - Express.js
  - JWT for authentication
- **Database:**
  - MongoDB
- **Others:**
  - Git & GitHub for version control

## Installation

1. **Clone the Repository**  
   Use the command `git clone https://github.com/cinnlight/booksearch-api-refactor.git` to clone the repository.

2. **Navigate to the Project Directory**  
   Change to the project directory using `cd booksearch-api-refactor/`.

3. **Install Dependencies**  
   Navigate to the root folder with and install dependencies by running `npm install`.

4. **Set Up Environment Variables**  
   Create a `.env` file in both the `backend` and `frontend` directories with the necessary configurations such as database URI, JWT secret, Google Books API key, and other relevant settings.

## Usage

1. **Start the Application**  
   Navigate to the root directory and start both client and server with `npm run develop`.

2. **Access the Application**  
   Open your browser and navigate to `http://localhost:3001` by default to use the application.

## Authentication

The application uses JWT for authentication. Upon successful login, a JWT token is generated and sent to the client. The client stores this token securely and includes it in the Authorization header for subsequent requests to protected routes. The backend verifies the token to ensure that the user is authenticated before granting access to protected resources.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any questions or feedback, please contact [cinnlight@gmail.com](mailto:cinnlight@gmail.com).
