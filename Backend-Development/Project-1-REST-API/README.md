# DecodeLabs Backend Development – Project 1

## REST API Fundamentals

This project was completed as part of my **Backend Development Internship at DecodeLabs**.

The purpose of this project is to understand the fundamentals of REST APIs by creating a simple stateless web server using **Node.js and Express.js**. The API demonstrates basic routing, HTTP methods, JSON responses, request handling, and error handling.

## Project Objective

Build a stateless web server that can:

* Run on a local server
* Handle GET requests
* Handle POST requests
* Accept JSON data
* Return structured JSON responses
* Use appropriate HTTP status codes
* Handle invalid requests and unknown routes

## Technologies Used

* Node.js
* Express.js
* JavaScript
* REST API
* JSON
* Thunder Client for API testing

## Project Structure

```text
Project-1-REST-API/
│
├── routes/
│   └── items.js
├── server.js
├── package.json
└── README.md
```

## Installation

Clone the repository and navigate to the project directory.

Install the required dependencies:

```bash
npm install
```

## Running the Server

Start the server using:

```bash
npm start
```

The server will run locally on:

```text
http://localhost:3000
```

## API Endpoints

### Home

```http
GET /
```

Returns a message confirming that the REST API is running.

Example response:

```json
{
  "success": true,
  "message": "DecodeLabs REST API is running"
}
```

### Get All Items

```http
GET /api/items
```

Returns all available items.

Example response:

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "Node.js",
      "description": "JavaScript runtime for backend development"
    },
    {
      "id": 2,
      "name": "Express.js",
      "description": "Framework for building REST APIs"
    }
  ]
}
```

### Get Item by ID

```http
GET /api/items/1
```

Returns a specific item based on its ID.

### Create an Item

```http
POST /api/items
```

Example JSON request body:

```json
{
  "name": "MongoDB",
  "description": "NoSQL database"
}
```

Example response:

```json
{
  "success": true,
  "message": "Item created successfully",
  "data": {
    "id": 3,
    "name": "MongoDB",
    "description": "NoSQL database"
  }
}
```

## Error Handling

The API includes basic error handling for:

* Missing required fields
* Item not found
* Unknown routes
* Internal server errors

Example error response:

```json
{
  "success": false,
  "message": "Route not found"
}
```

## HTTP Status Codes

| Status Code | Description                     |
| ----------- | ------------------------------- |
| `200`       | Request successful              |
| `201`       | Resource created successfully   |
| `400`       | Invalid or missing request data |
| `404`       | Resource or route not found     |
| `500`       | Internal server error           |

## What I Learned

Through this project, I practiced:

* Creating a local backend server
* Understanding REST API fundamentals
* Working with GET and POST HTTP methods
* Creating API routes with Express.js
* Sending and receiving JSON data
* Using HTTP status codes
* Validating request data
* Handling API errors
* Testing API endpoints using Thunder Client
* Understanding stateless client-server communication

## Internship

**Backend Development Internship – DecodeLabs**
**Project 1: REST API Fundamentals**
**Batch: 2026**
