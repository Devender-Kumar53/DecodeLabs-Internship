# Project 2 - Database Integration (CRUD)

This project is part of the **DecodeLabs Backend Development Internship - Batch 2026**.

The goal of this project is to connect a REST API with a PostgreSQL database and implement persistent CRUD operations for user data.

## Technologies Used

- Node.js
- TypeScript
- Express.js
- PostgreSQL
- Prisma ORM
- Thunder Client

## Features

- Create a new user
- Retrieve all users
- Retrieve a user by ID
- Update an existing user
- Delete a user
- Prevent duplicate email addresses
- Validate user age
- Store data permanently in PostgreSQL
- Handle HTTP status codes and errors

## User Schema

| Field | Type | Description |
|---|---|---|
| `id` | Integer | Auto-generated unique user ID |
| `email` | String | Unique email address |
| `age` | Integer | Must be greater than or equal to 0 |
| `isActive` | Boolean | Defaults to `true` |
| `createdAt` | Timestamp | Automatically stores creation time |

The database also includes a check constraint to ensure:

```text
age >= 0
```

## API Endpoints

| Method | Endpoint | Description | Success Status |
|---|---|---|---|
| GET | `/` | API status/root route | 200 |
| POST | `/api/users` | Create a user | 201 |
| GET | `/api/users` | Get all users | 200 |
| GET | `/api/users/:id` | Get user by ID | 200 |
| PUT | `/api/users/:id` | Update a user | 200 |
| DELETE | `/api/users/:id` | Delete a user | 204 |

## Example - Create User

### Request

```http
POST /api/users
```

```json
{
  "email": "test@example.com",
  "age": 24
}
```

### Example Response

```json
{
  "id": 1,
  "email": "test@example.com",
  "age": 24,
  "isActive": true,
  "createdAt": "2026-09-23T00:00:00.000Z"
}
```

## Error Handling

The API uses appropriate HTTP status codes:

- `400 Bad Request` - Invalid input
- `404 Not Found` - User does not exist
- `409 Conflict` - Email already exists
- `500 Internal Server Error` - Unexpected server/database error

## Environment Setup

Create a `.env` file using `.env.example` as a reference:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/decodelabs_db?schema=public"
```

Do not commit the real `.env` file because it contains database credentials.

## Installation

Install the dependencies:

```bash
npm install
```

Generate the Prisma contract:

```bash
npm run contract:emit
```

Make sure PostgreSQL is running and the `decodelabs_db` database exists.

Apply the Prisma database schema:

```bash
npx prisma db init
```

If the database has already been initialized and the contract changes, use:

```bash
npx prisma db update
```

## Run the Project

Start the development server:

```bash
npm run dev
```

The API will run at:

```text
http://localhost:3000
```

## Testing

The CRUD endpoints were tested using Thunder Client.

The project verifies:

- User creation
- Duplicate email prevention
- Reading users from PostgreSQL
- Updating user information
- Deleting users
- Invalid ID handling
- Negative age validation
- Data persistence after restarting the server

## Project Structure

```text
Project-2-Database-CRUD/
├── migrations/
├── src/
│   ├── prisma/
│   │   ├── contract.prisma
│   │   ├── contract.json
│   │   ├── contract.d.ts
│   │   └── db.ts
│   └── server.ts
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── prisma.config.ts
├── tsconfig.json
└── README.md
```

## Author

**Devender Kumar**

DecodeLabs Backend Development Internship - Batch 2026