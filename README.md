# user_manager


# User Management Application

This project is a full-stack user management application built using React, Node.js, Express, MongoDB, and Mongoose. The application allows users to sign up, view a list of registered users, and delete users. The frontend is built with React, while the backend uses Node.js, Express, and MongoDB for the database.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/) (v12.0.0 or higher)
- [npm](https://www.npmjs.com/) (v6.0.0 or higher) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (v4.0 or higher)

## Installation

### Backend Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/user-management-app.git
    cd user-management-app
    ```

2. **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

3. **Install backend dependencies:**

    ```bash
    npm install
    ```

4. **Set up environment variables:**

    Create a `.env` file in the `backend` directory and add the following:

    ```env
    PORT=8080
    MONGODB_URI=mongodb://localhost:27017/userManagementDB
    ```

5. **Start the backend server:**

    ```bash
    npm start
    ```

    The backend server will start on `http://localhost:8080`.

### Frontend Setup

1. **Navigate to the frontend directory:**

    ```bash
    cd ../frontend
    ```

2. **Install frontend dependencies:**

    ```bash
    npm install
    ```

3. **Start the frontend development server:**

    ```bash
    npm start
    ```

    The frontend server will start on `http://localhost:3000`.

## Running the Application

1. Ensure MongoDB is running locally.
2. Start the backend server (`http://localhost:8080`).
3. Start the frontend server (`http://localhost:3000`).

## Project Structure

