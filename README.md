# ABC Blockchain Club - Backend

Welcome to the backend repository for the ABC Blockchain Coding Club website. This project aims to provide a robust backend service for managing user data and interactions within the club's website. 

## Table of Contents
- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
  - [User Endpoints](#user-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The backend service is built using Node.js and Express.js. It includes models and APIs for managing users, with plans to extend functionality to other aspects of the club's website.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- Node.js (>= 14.x)
- npm (>= 6.x)
- PostgreSQL (or any other relational database)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/abc-backend.git
   cd abc-blockchain-backend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up your environment variables. Create a `.env` file in the root directory and add the following:
   ```env
   DB_URL=your-database-connection-string
   PORT=5500
   
   ```

4. Start the development server:
   ```sh
   npm run dev
   ```

Your server should now be running on `http://localhost:5500`.

## Configuration

The configuration for the project is managed via environment variables. Ensure you have a `.env` file in the root of your project with the necessary variables as described in the Getting Started section.

## API Documentation

### User Endpoints

#### Create a New User

- **URL**: `/api/users`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }
  ```
- **Success Response**:
  - **Code**: `201 Created`
  - **Content**:
    ```json
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com"
    }
    ```

#### Get All Users

- **URL**: `/api/users`
- **Method**: `GET`
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@example.com"
      },
      {
        "id": 2,
        "name": "Jane Smith",
        "email": "jane.smith@example.com"
      }
    ]
    ```

#### Get a Single User

- **URL**: `/api/users/:id`
- **Method**: `GET`
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com"
    }
    ```

#### Update a User

- **URL**: `/api/users/:id`
- **Method**: `PUT`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "newpassword"
  }
  ```
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com"
    }
    ```

#### Delete a User

- **URL**: `/api/users/:id`
- **Method**: `DELETE`
- **Success Response**:
  - **Code**: `204 No Content`

## Contributing

We welcome contributions from the community! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes.
4. Commit your changes with a clear message.
5. Push to your branch.
6. Open a Pull Request describing your changes.


Thank you for contributing to the ABC Blockchain Coding Club! If you have any questions or need further assistance, feel free to reach out to the project maintainers.
