import 'dotenv/config';
import express from 'express';
import axios, { AxiosError } from 'axios';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'DecodeLabs Project 4 - Third-Party API Integration',
  });
});

app.get('/api/weather', async (req, res) => {
  const city = req.query.city;

  if (!city || typeof city !== 'string') {
    return res.status(400).json({
      error: 'City query parameter is required',
    });
  }

  const apiKey = process.env['WEATHER_API_KEY'];

  if (!apiKey) {
    console.error('WEATHER_API_KEY is not configured');

    return res.status(500).json({
      error: 'Weather service is not configured',
    });
  }

  try {
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          q: city,
          appid: apiKey,
          units: 'metric',
        },
        timeout: 5000,
      }
    );

    const weatherData = response.data;

return res.status(200).json({
  city: weatherData.name,
  country: weatherData.sys.country,
  temperature: weatherData.main.temp,
  feelsLike: weatherData.main.feels_like,
  humidity: weatherData.main.humidity,
  condition: weatherData.weather[0]?.main,
  description: weatherData.weather[0]?.description,
  windSpeed: weatherData.wind.speed,
});

  } catch (error) {
  if (error instanceof AxiosError) {
    if (error.response?.status === 404) {
      return res.status(404).json({
        error: 'City not found',
      });
    }

    if (error.code === 'ECONNABORTED') {
      return res.status(504).json({
        error: 'Weather service request timed out',
      });
    }

    console.error('Weather API error:', error.message);

    return res.status(502).json({
      error: 'Weather service is currently unavailable',
    });
  }

  console.error('Unexpected error:', error);

  return res.status(500).json({
    error: 'Internal server error',
  });
}
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});