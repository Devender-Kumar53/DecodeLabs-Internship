# DecodeLabs Backend Development Internship - Project 4

## Third-Party API Integration

This project demonstrates third-party API integration by connecting an Express backend to the OpenWeather API.

The backend securely manages the external API key, fetches weather data asynchronously, transforms the third-party response, and returns a simplified response to the client.

## Features

- Third-party weather API integration
- Secure API key management using environment variables
- Asynchronous API requests using `async/await`
- Axios for external HTTP requests
- 5-second request timeout
- Weather data transformation
- City query validation
- Error handling for invalid cities
- Timeout handling
- Third-party service failure handling
- TypeScript support

## Tech Stack

- Node.js
- TypeScript
- Express.js
- Axios
- OpenWeather API
- dotenv

## API Endpoints

### Root

```http
GET /
```

Successful response:

```json
{
  "message": "DecodeLabs Project 4 - Third-Party API Integration"
}
```

### Get Weather

```http
GET /api/weather?city=Karachi
```

The backend requests weather information from OpenWeather and transforms the external response before returning it to the client.

Example response:

```json
{
  "city": "Karachi",
  "country": "PK",
  "temperature": 26.9,
  "feelsLike": 29.01,
  "humidity": 74,
  "condition": "Clouds",
  "description": "few clouds",
  "windSpeed": 2.06
}
```

Weather values depend on the current data returned by the external API.

## Error Handling

### Missing City

Request:

```http
GET /api/weather
```

Response:

```text
400 Bad Request
```

```json
{
  "error": "City query parameter is required"
}
```

### Invalid City

Response:

```text
404 Not Found
```

```json
{
  "error": "City not found"
}
```

### External API Timeout

If the external weather service exceeds the configured request timeout, the backend returns:

```text
504 Gateway Timeout
```

### External Service Failure

Other third-party service failures return:

```text
502 Bad Gateway
```

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
WEATHER_API_KEY="YOUR_API_KEY_HERE"
```

The real API key must never be committed to the repository.

## How to Run

### 1. Install dependencies

```bash
npm install
```

### 2. Configure the API key

Create a `.env` file and add your OpenWeather API key:

```env
WEATHER_API_KEY="YOUR_API_KEY_HERE"
```

### 3. Start the development server

```bash
npm run dev
```

The API runs at:

```text
http://localhost:3000
```

### 4. Test the weather endpoint

```text
http://localhost:3000/api/weather?city=Karachi
```

You can replace `Karachi` with another city name.

## Security

- The OpenWeather API key is stored in `.env`.
- `.env` is excluded from Git through `.gitignore`.
- `.env.example` contains only a safe placeholder.
- The API key is never returned to the client.

## Project Flow

```text
Client
  ↓
Express Backend
  ↓
Read API Key from Environment
  ↓
OpenWeather API
  ↓
Raw Weather Data
  ↓
Transform Response
  ↓
Clean JSON Response
  ↓
Client
```

## Project Status

Completed and tested successfully.