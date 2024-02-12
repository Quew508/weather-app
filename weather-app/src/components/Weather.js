// src/components/Weather.js
import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = 'b4d6fc2b0b9e4ba592d8ac9a3f8530cc'; // Replace with your OpenWeatherMap API key

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const getWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}`
      );
      setWeatherData(response.data.data[0]);
      setError(null);
    } catch (error) {
      setWeatherData(null);
      setError('City not found. Please enter a valid city.');
      setTimeout(() => {
        setError(null);
      }, 3000)
    }
  };

  return (
    <div>
      <h2>Weather App</h2>
      <div>
        <label htmlFor="cityInput">Enter City: </label>
        <input
          type="text"
          id="cityInput"
          value={city}
          onChange={handleInputChange}
        />
        <button onClick={getWeatherData}>Get Weather</button>
      </div>

      {weatherData && (
        <div>
          <h3>{weatherData.city_name}, {weatherData.country_code}</h3>
          <p>Temperature: {weatherData.temp} &#8451;</p>
          <p>Weather: {weatherData.weather.description}</p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Weather;
