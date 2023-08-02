//Dependency Imports
import React from 'react';
import {
  TbTemperaturePlus,
  TbTemperatureMinus,
} from 'react-icons/tb';
import { WiHumidity } from 'react-icons/wi';
import {
  FaTemperatureLow,
  FaTemperatureHigh,
  FaWind,
} from 'react-icons/fa';
import { GiWindyStripes } from 'react-icons/gi';

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

interface InputProps {
  weatherData: WeatherData;
}

const WeatherDetails = ({ weatherData }: InputProps) => {
  return (
    <div className="w-full md:w-1/3 flex flex-col">
      <div className="flex flex-col md:flex-row md:gap-4 items-center justify-between md:p-4">
        <div className="w-full md:w-1/2 flex flex-row items-center justify-between bg-white/75 px-8 py-4 my-2 md:my-0 rounded-xl">
          <div>
            <p className="text-lg">Feels Like</p>
            <p className="text-2xl">
              {(weatherData.main.feels_like - 273.15).toFixed()}°C
            </p>
          </div>
          <div>
            {weatherData.main.feels_like > weatherData.main.temp ? (
              <TbTemperaturePlus size={48} />
            ) : (
              <TbTemperatureMinus size={48} />
            )}
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-row items-center justify-between bg-white/75 px-8 py-4 my-2 md:my-0 rounded-xl">
          <div>
            <p className="text-lg">Humidity</p>
            <p className="text-2xl">{weatherData.main.humidity}%</p>
          </div>
          <div>
            <WiHumidity size={48} />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:gap-4 items-center justify-between md:p-4">
        <div className="w-full md:w-1/2 flex flex-row items-center justify-between bg-white/75 px-8 py-4 my-2 md:my-0 rounded-xl">
          <div>
            <p className="text-lg">Min. Temp</p>
            <p className="text-2xl">
              {(weatherData.main.temp_min - 273.15).toFixed()}°C
            </p>
          </div>
          <div>
            <FaTemperatureLow size={40} />
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-row items-center justify-between bg-white/75 px-8 py-4 my-2 md:my-0 rounded-xl">
          <div>
            <p className="text-lg">Max. Temp</p>
            <p className="text-2xl">
              {(weatherData.main.temp_max - 273.15).toFixed()}°C
            </p>
          </div>
          <div>
            <FaTemperatureHigh size={40} />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:gap-4 items-center justify-between md:p-4">
        <div className="w-full md:w-1/2 flex flex-row items-center justify-between bg-white/75 px-8 py-4 my-2 md:my-0 rounded-xl">
          <div>
            <p className="text-lg">Pressure</p>
            <p className="text-2xl">{weatherData.main.pressure}hPa</p>
          </div>
          <div>
            <FaWind size={40} />
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-row items-center justify-between bg-white/75 px-8 py-4 my-2 md:my-0 rounded-xl">
          <div>
            <p className="text-lg">Wind Speed</p>
            <p className="text-2xl">{weatherData.wind.speed}km/h</p>
          </div>
          <div>
            <GiWindyStripes size={40} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
