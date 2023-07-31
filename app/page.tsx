//Rendering the page on client side
'use client';

//Dependency Imports
import Image from 'next/image';
import React, { useState } from 'react';

//Component Imports
import Input from './components/Input';
import Current from './components/Current';
import WeatherDetails from './components/WeatherDetails';

export default function Home() {
  // API Key
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  //Setting types for variables
  type WeatherData = {
    coord: {
      lon: string;
      lat: string;
    };
    weather: [
      {
        id: number;
        main: string;
        description: string;
        icon: string;
      }
    ];
    base: string;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    visibility: number;
    wind: {
      speed: number;
      deg: number;
    };
    clouds: {
      all: number;
    };
    dt: number;
    sys: {
      type: number;
      id: number;
      country: string;
      sunrise: number;
      sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
  };

  //Variables for weather data
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [weatherError, setWeatherError] = useState('');

  //Variables for location data
  const [location, setLocation] = useState('');

  //URL: Location API Call
  const locationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`;

  //Function to fetch weather data
  const fetchWeather = async (lat: string, lon: string) => {
    //URL: Weather API Call
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    try {
      const response = await fetch(weatherUrl);
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      // console.log(data.main.temp - 273);
      setWeatherData(data);
      setWeatherError('');
    } catch {
      setWeatherError('The weather data is not available');
    }
  };

  //Function to fetch location data
  const fetchLocation = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      try {
        const response = await fetch(locationUrl);
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        // console.log(data[0].lat, data[0].lon);
        return fetchWeather(data[0].lat, data[0].lon);
      } catch {
        setLocation('');
        setWeatherError(
          'Location not found. The weather data is not available.'
        );
      }
    }
  };

  //Content for the weather app based on the current state
  let content;
  //State: Default
  if (typeof weatherData === 'undefined' && weatherError === '') {
    content = (
      <div className="flex flex-row h-[32rem] md:h-full md:flex-row items-center justify-center px-12 pb-16 md:p-24">
        <h2 className="text-white text-3xl md:-mt-24">
          Live Weather App
        </h2>
      </div>
    );
  }
  //State: Unexpected Error
  else if (weatherError !== '') {
    content = (
      <div className="flex flex-row h-[32rem] md:h-full md:flex-row items-center justify-center px-12 pb-16 md:p-24">
        <h2 className="text-white text-3xl md:-mt-24 text-center">
          The weather data for this location is not available. Enter a
          valid city.
        </h2>
      </div>
    );
  }
  //State: Weather Data for searched city is available
  else {
    content = (
      <div className="flex flex-col md:h-2/3 md:flex-row items-center justify-between px-12 pb-16 md:p-24">
        <Current weatherData={weatherData} />
        <WeatherDetails weatherData={weatherData} />
      </div>
    );
  }

  return (
    <main className="h-full md:h-screen bg-cover bg-gradient-to-r from-blue-600 to-blue-400">
      <div className="h-full w-full flex flex-col bg-white/20 rounded-lg backdrop-blur-sm">
        {/* Input and Logo */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between p-12">
          <Input
            fetchLocation={fetchLocation}
            setLocation={setLocation}
          />
          <a href="/">
            <h1 className="mb-8 md:mb-0 py-2 px-4 text-white font-poppins font-bold italic text-3xl">
              Weather App
            </h1>
          </a>
        </div>
        {content}
      </div>
    </main>
  );
}
