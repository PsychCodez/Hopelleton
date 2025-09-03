# Hopelleton - Property Rental Platform

Welcome to Hopelleton, a full-stack web application for renting properties. This platform connects property owners (hosts) with people looking for accommodations (guests). It is designed to be a comprehensive solution for managing property listings, bookings, payments, and reviews.

This document provides a detailed overview of the project, including its architecture, API, data flow, and setup instructions.

## Table of Contents

- [High-Level Design (HLD)](#high-level-design-hld)
- [Low-Level Design (LLD)](#low-level-design-lld)
- [API Documentation](#api-documentation)
- [Data Flow](#data-flow)
- [Setup and Installation](#setup-and-installation)

## High-Level Design (HLD)

The Hopelleton platform is built on a classic client-server architecture.

-   **Client (Frontend):** A single-page application (SPA) built with **React**. It provides a user-friendly interface for guests and hosts to interact with the platform.
-   **Server (Backend):** A RESTful API built with **Node.js** and the **Express.js** framework. It handles all business logic, data processing, and communication with the database.
-   **Database:** A **MySQL** relational database is used to store all application data, including user information, property listings, bookings, and reviews.

The frontend communicates with the backend via HTTP requests. The backend, in turn, queries the database to retrieve or store data and then sends the appropriate response back to the frontend.

## Low-Level Design (LLD)

### Backend

The backend follows a layered architecture, separating concerns into different modules.

-   **`app.js`:** The main entry point of the application. It sets up the Express server, configures middleware (like `cors` and `body-parser`), and mounts the API routes.
-   **`db/`:** Contains the database connection configuration (`db.js`).
-   **`routes/`:** Defines the API endpoints. Each file in this directory corresponds to a specific resource (e.g., `user.js`, `property.js`) and maps the endpoints to controller functions.
-   **`controllers/`:** Contains the logic for handling incoming requests. Controllers extract data from the request, call the appropriate business logic functions in the modules, and send the response back to the client.
-   **`modules/`:** Contains the business logic and database interaction code. These modules are responsible for executing SQL queries and performing data manipulations.
-   **`SQL_Backend.sql`:** This file contains the complete database schema, including table definitions, triggers, stored procedures, and initial data.

**Database Schema:**

The database consists of several tables, including:

-   `User`: Stores user information (name, email, etc.).
-   `Host`: Stores host-specific information.
-   `Guest`: Stores guest-specific information.
-   `Property`: Contains details about the properties listed on the platform.
-   `Booking`: Manages booking information.
-   `Review`: Stores user reviews for properties.
-   `Amenity`: Lists available amenities.
-   `Payment`: Handles payment information.
-   And others...

### Frontend

The frontend is a React application created with `create-react-app`.

-   **`src/App.js`:** The main component of the application. It sets up the routing using `react-router-dom` and renders the different pages of the application.
-   **`src/components/` (Implicit):** The application is structured with several components, each responsible for a specific part of the UI (e.g., `Carousel`, `BookingPage`, `Login/Register Modal`).
-   **`axios`:** Used for making HTTP requests to the backend API.
-   **`react-router-dom`:** Used for client-side routing, allowing for a seamless single-page application experience.

## API Documentation

The backend provides a RESTful API for interacting with the application's resources. Here are some of the main endpoints:

### Users

-   **`POST /users`**: Create a new user.
    -   **Request Body:** `{ "name": "...", "email": "...", ... }`
-   **`GET /users`**: Get a list of all users.
-   **`GET /users/:id`**: Get a specific user by their ID.
-   **`PUT /users/:id`**: Update a user's information.
-   **`DELETE /users/:id`**: Delete a user.

### Properties

-   **`GET /properties`**: Get a list of all properties.
-   **`GET /properties/:id`**: Get a specific property by its ID.
-   **`POST /properties`**: Create a new property listing.
-   ...and other CRUD operations.

### Bookings

-   **`POST /bookings`**: Create a new booking.
-   **`GET /bookings/:id`**: Get booking details.
-   ...and other CRUD operations.

## Data Flow

Here are a few examples of how data flows through the system:

**1. User Registration:**

1.  The user fills out the registration form on the React frontend.
2.  The frontend sends a `POST` request to the `/users` endpoint with the user's data in the request body.
3.  The backend's `userController` receives the request and calls the `createUser` function in the `userModule`.
4.  The `userModule` executes an `INSERT` query to save the new user's data in the `User` table in the MySQL database.
5.  The database confirms the insertion, and the backend sends a success response to the frontend.

**2. Searching for a Property:**

1.  The user enters search criteria (e.g., destination, dates, number of guests) on the frontend.
2.  The frontend sends a `GET` request to a search endpoint (e.g., `/query/available`) with the search criteria as query parameters.
3.  The backend receives the request and queries the database to find properties that match the criteria. This may involve joining multiple tables (e.g., `Property`, `Location`, `Booking`).
4.  The database returns a list of available properties.
5.  The backend sends the list of properties to the frontend, which then displays them to the user.

## Setup and Installation

To run this project locally, you will need to have **Node.js** and **MySQL** installed on your machine.

### Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `backend` directory with the following content, replacing the values with your MySQL database credentials:
    ```
    DB_HOST=localhost
    DB_USER=your_mysql_user
    DB_PASS=your_mysql_password
    DB_NAME=hopelletonv1
    ```
4.  Set up the database by running the `SQL_Backend.sql` script in your MySQL server. This will create the `hopelletonv1` database and all the necessary tables.
5.  Start the backend server:
    ```bash
    npm start
    ```
    The server will be running on `http://localhost:5000`.

### Frontend Setup

1.  Open a new terminal and navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Start the frontend development server:
    ```bash
    npm start
    ```
    The application will open in your browser at `http://localhost:3000`.
