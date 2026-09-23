# DecodeLabs Backend Development Internship - Project 3

## Secure Authentication System

This project implements a secure authentication system using Node.js, Express, TypeScript, PostgreSQL, Prisma ORM, Argon2id, and JSON Web Tokens (JWT).

The API allows users to register securely, log in with their credentials, receive a JWT, and access protected routes using Bearer token authentication.

## Features

- User registration
- Secure password hashing using Argon2id
- PostgreSQL database persistence
- Unique email validation
- User login with password verification
- JWT generation after successful login
- JWT expiration after 1 hour
- Authentication middleware
- Protected API route
- 401 Unauthorized handling for missing, invalid, or expired tokens
- Environment variable protection using `.env`

## Tech Stack

- Node.js
- TypeScript
- Express.js
- PostgreSQL
- Prisma ORM
- Argon2
- JSON Web Token (JWT)
- dotenv

## User Model

The authentication system stores the following user information:

- `id` - Auto-generated user ID
- `email` - Unique user email
- `passwordHash` - Argon2id password hash
- `createdAt` - Account creation timestamp

Plaintext passwords are never stored in the database.

## API Endpoints

### Health / Root

```http
GET /
```

Returns a message confirming that the API is running.

### Register User

```http
POST /api/auth/register
```

Example request:

```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

Successful response:

```text
201 Created
```

Duplicate email:

```text
409 Conflict
```

### Login

```http
POST /api/auth/login
```

Example request:

```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

A successful login returns a JWT:

```json
{
  "message": "Login successful",
  "token": "<JWT_TOKEN>"
}
```

Invalid credentials return:

```text
401 Unauthorized
```

### Protected Route

```http
GET /api/protected
```

The request must include:

```http
Authorization: Bearer <JWT_TOKEN>
```

A valid JWT grants access to the protected route.

Missing, invalid, or expired tokens return:

```text
401 Unauthorized
```

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/decodelabs_auth_db?schema=public"
JWT_SECRET="YOUR_JWT_SECRET"
```

Never commit the real `.env` file or expose the JWT secret/database password.

## How to Run

### 1. Install dependencies

```bash
npm install
```

### 2. Create the PostgreSQL database

Create a database named:

```text
decodelabs_auth_db
```

### 3. Configure environment variables

Copy `.env.example` to `.env` and replace the placeholder values with your local PostgreSQL password and a secure JWT secret.

### 4. Generate the Prisma contract

```bash
npx prisma contract emit
```

### 5. Initialize the database

For a fresh database:

```bash
npx prisma db init
```

### 6. Start the development server

```bash
npm run dev
```

The API will run at:

```text
http://localhost:3000
```

## Security

- Passwords are hashed with Argon2id before database storage.
- Plaintext passwords are never stored.
- JWTs are signed using a secret stored in environment variables.
- JWTs expire after 1 hour.
- Protected routes verify the Bearer token before granting access.
- Missing, invalid, or expired tokens return HTTP 401.
- `.env` is excluded from Git using `.gitignore`.

## Project Status

Completed and tested successfully.