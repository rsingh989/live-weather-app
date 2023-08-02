//Dependency Imports
import React from 'react';
import Image from 'next/image';
import { getCurrentDate } from '../utils/CurrentDate';
import { WeatherData } from '../utils/WeatherData';

//Defining imported type for props
interface InputProps {
  weatherData: WeatherData;
}

const Current = ({ weatherData }: InputProps) => {
  let icon: string;
  //Function to assign weather icon url based on the current weather data
  const fetchWeatherIcon = () => {
    const typeOfWeather = weatherData.weather[0].id;
    if (typeOfWeather >= 200 && typeOfWeather <= 232) {
      icon = '11d';
    } else if (typeOfWeather >= 300 && typeOfWeather <= 321) {
      icon = '09d';
    } else if (typeOfWeather >= 500 && typeOfWeather <= 504) {
      icon = '10d';
    } else if (typeOfWeather >= 511 && typeOfWeather <= 531) {
      icon = '09d';
    } else if (typeOfWeather >= 600 && typeOfWeather <= 622) {
      icon = '13d';
    } else if (typeOfWeather >= 701 && typeOfWeather <= 781) {
      icon = '50d';
    } else if (typeOfWeather === 800) {
      icon = '01d';
    } else if (typeOfWeather === 801) {
      icon = '02d';
    } else if (typeOfWeather === 802) {
      icon = '03d';
    } else if (typeOfWeather >= 803 && typeOfWeather <= 804) {
      icon = '04d';
    }

    const weatherIconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    return weatherIconUrl;
  };

  const currentDate = getCurrentDate();
  const weatherIcon: string = fetchWeatherIcon();

  return (
    <div className="flex flex-col p-4 items-start gap-2 w-full md:w-1/4">
      <div className="w-full flex items-center justify-between">
        <div>
          <h3 className="text-3xl text-white my-2">Today</h3>
          <p className="text-white my-2">{currentDate}</p>
        </div>
        {weatherIcon && (
          <div className="bg-white/25 rounded-2xl flex items-center justify-center w-20 h-20">
            <Image src={weatherIcon} width={64} height={64} alt="" />
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <p className="text-5xl text-white my-2">
          {(weatherData.main.temp - 273.15).toFixed()}°C
        </p>
        <p className="text-white my-2">
          {weatherData.weather[0].main.toUpperCase()}
        </p>
      </div>
    </div>
  );
};

export default Current;
