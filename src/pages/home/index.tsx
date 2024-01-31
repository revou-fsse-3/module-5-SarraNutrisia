import React, { useEffect, useState } from "react";
import { GetServerSideProps } from 'next';
import { Input } from "../../components";
import styles from "./HomeContainer.module.css";
import search_icon from "../../assets/search.png";
import sunny_icon from "../../assets/sunny.png";
import cloud_icon from "../../assets/cloud.png";
import lightrain_icon from "../../assets/light_rain.png";
import rain_icon from "../../assets/rain.png";
import snow_icon from "../../assets/snow.png";
import wind_icon from "../../assets/wind.png";
import humidity_icon from "../../assets/humidity.png";
import storm_icon from "../../assets/thunderstorm.png";
import foggy_icon from "../../assets/foggy.png";
import weather_icon from "../../assets/weather_icon.svg";
import Image, { StaticImageData } from "next/image";
import { useRouter } from 'next/router';

interface WeatherData {
  main: {
    humidity?: number;
    temp?: number;
  };
  wind: {
    speed?: number;
  };
  name?: string;
  weather: {
    description: string;
    icon: string;
  }[];
}

interface HomeContainerProps {
    initialData: WeatherData;
}

const HomeContainer: React.FC<HomeContainerProps> = ({ initialData }) => {

  const router = useRouter();
 
  const apiKey = "c1bbe714ac530d052910f744c4c3da7b";
  const [wicon, setWicon] = useState<StaticImageData>(weather_icon);
  const [humidity, setHumidity] = useState<string>("-");
  const [windSpeed, setWindSpeed] = useState<string>("-");
  const [temperature, setTemperature] = useState<string>("-");
  const [location, setLocation] = useState<string>("City");
  const [condition, setCondition] = useState<string>("Weather Condition");
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      searchByCoordinates(latitude, longitude);
    });
  }, []);

  const handleLogout = () => {
    // Clear the token from sessionStorage or perform any other logout logic
    window.sessionStorage.removeItem('token');
    router.push('/login');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const search = async () => {
    if (searchValue === "") {
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=Metric&appid=${apiKey}`;
      const response = await fetch(url);
      const data: WeatherData = await response.json();
      console.log(data);
      updateWeatherData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const searchByCoordinates = async (latitude: number, longitude: number) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=Metric&appid=${apiKey}`;
      const response = await fetch(url);
      const data: WeatherData = await response.json();

      updateWeatherData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateWeatherData = (data: WeatherData) => {
    if (data.main && data.main.humidity) {
      setHumidity(`${data.main.humidity}%`);
    } else {
      setHumidity("-");
    }

    if (data.wind && data.wind.speed) {
      setWindSpeed(`${Math.floor(data.wind.speed)} Km/h`);
    } else {
      setWindSpeed("-");
    }

    if (data.main && data.main.temp) {
      setTemperature(`${Math.floor(data.main.temp)}°C`);
    } else {
      setTemperature("-");
    }

    if (data.name) {
      setLocation(data.name);
    } else {
      setLocation("-");
    }

    if (data.weather && data.weather[0] && data.weather[0].description) {
      setCondition(data.weather[0].description);
    } else {
      setCondition("Weather Condition");
    }

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setWicon(sunny_icon);
    } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
      setWicon(cloud_icon);
    } else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
      setWicon(lightrain_icon);
    } else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
      setWicon(cloud_icon);
    } else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
      setWicon(rain_icon);
    } else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
      setWicon(rain_icon);
    } else if (data.weather[0].icon === "11d" || data.weather[0].icon === "11n") {
      setWicon(storm_icon);
    } else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
      setWicon(snow_icon);
    } else if (data.weather[0].icon === "50d" || data.weather[0].icon === "50n") {
      setWicon(foggy_icon);
    } else {
      setWicon(sunny_icon);
    }
  };

  return (
    <div className={styles.container} >
      <div>
      <button onClick={handleLogout}>Logout</button>
        <h1 className="font-semibold text-4xl text-white flex justify-center items-center pt-10 pb-10">Weather Forecast App</h1>
      </div>
      <div className="top-bar flex justify-center items-center h-1/6 space-x-3 pb-10">
        <Input
          type="text"
          placeholder="Search"
          className={`${styles.cityInput} cityInput`}
          value={searchValue}
          onChange={handleInputChange}
        />
        <div className={`${styles.searchIcon}`}>
          <Image src={search_icon} alt="magnifying glass icon" onClick={search} />
        </div>
      </div>
      <div className={styles.weatherImage}>
        <Image src={wicon} alt="weather icon" />
      </div>
      
      <div className={`${styles.weatherTemp} weatherTemp`}>{temperature}</div>
      <div className={`${styles.weatherLocation} weatherLocation`}>{location}</div>
      <div className={`${styles.weatherCondition} weatherCondition`}>{condition}</div>
      <div className={styles.dataContainer}>
        <div className={styles.element}>
          <Image src={humidity_icon} alt="humidity icon" className={styles.icon} />
          <div className={styles.data}>
            <div className="humidityPercent">{humidity}</div>
            <div className={styles.text}>Humidity</div>
          </div>
        </div>

        <div className={styles.element}>
          <Image src={wind_icon} alt="wind icon" className={styles.icon} />
          <div className={styles.data}>
            <div className="windRate">{windSpeed}</div>
            <div className={styles.text}>Wind Speed</div>
          </div>
        </div>
      </div>
    </div> 
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const apiKey = 'c1bbe714ac530d052910f744c4c3da7b';
    const defaultCity = 'Jakarta';
  
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&units=Metric&appid=${apiKey}`;
      const response = await fetch(url);
      const data: WeatherData = await response.json();
  
      return {
        props: {
          initialData: data,
        },
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        props: {
          initialData: {},
        },
      };
    }
  };

export default HomeContainer;
