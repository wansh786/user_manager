# User Management App

This is a simple React-based User Management application that allows users to sign up, view a list of registered users, delete users, select multiple users, and export selected users' data to a CSV file.

## Screenshots
![alt text](<Screenshot 2024-08-29 212954.png>)

## Features

- **User Sign Up**: Users can sign up by providing their email, first name, last name, and password.
- **View Users**: Displays a paginated list of users with their email, first name, and last name.
- **Delete Users**: Allows the deletion of individual users.
- **Select Users**: Users can select multiple users to be exported.
- **Export Users**: Exports selected users' data to a CSV file.

## Prerequisites

- **Node.js and npm**: Ensure Node.js and npm are installed on your system.
- **Backend API**: The application relies on a backend API to handle user data. The backend should be running locally.

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/user-management-app.git
    cd user-management-app
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the backend server:**

    Ensure that the backend API is running locally. Navigate to the backend directory and start the server:

    ```bash
    npm run server
    ```

4. **Start the React app:**

    ```bash
    npm start
    ```

    This command will start the application and open it in your default web browser. The app will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

- **App.js**: The main component that handles the user interface and interactions.
- **App.css**: Contains the styles for the application.
- **index.js**: The entry point of the application.

## Backend API

The backend API should expose the following endpoints:

- `GET /users`: Retrieve the list of users.
- `POST /users/register`: Register a new user.
- `DELETE /users/delete/:userId`: Delete a user by ID.
- `GET /users/export`: Export selected users' data to a CSV file.

### Example Backend Command

To start the backend server locally, use the following command in the backend project directory:

```bash
npm run server
