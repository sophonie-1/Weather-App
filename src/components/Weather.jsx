import "./weather.css";

import React, { useEffect, useState } from "react";

export default function Weather() {
  const [cityName, setCityNema] = useState("");
  const [input, setInput] = useState("burundi");
  const [weatherData, setWeatherData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const search = async (city) => {
    if (city === "") {
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setWeatherData({
          city: data.name,
          temperature: data.main.temp,
          humidity: data.main.humidity,
          wind: data.wind.speed,
          Wdescription: data.weather[0].description,
          country: data.sys.country,
        });
      } else {
        // Handle the case when the city is not found
        setErrorMessage("City not found");
        setWeatherData({
          city: "City not found",
          temperature: "",
          humidity: "",
          wind: "",
          Wdescription: "",
          country: "",
        });
      }
    } catch (error) {
      // Handle network errors or other unexpected errors
      setErrorMessage(
        "An error occurred while fetching weather data check your internet"
      );
      console.error("Error fetching weather data:", error);
    }
  };
  useEffect(() => {
    search(input);
  }, [input]);

  const handleInput = () => {
    if (cityName === "") {
      setErrorMessage("Please enter a city name");
      return;
    }
    setInput(cityName);
    setErrorMessage("");
    setCityNema("");
  };
  return (
    <div className="weather">
      <p style={{ color: "red" }}>{errorMessage}</p>
      <div className="search-bar">
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityNema(e.target.value)}
          placeholder="search..."
        />
        <img
          src="search-icon.png"
          onClick={() => handleInput()}
          alt=""
          className="search-icon"
        />
      </div>
      <img src="sun-iconn.png" alt="sun icon" className="sun-icon" />
      <p className="location">{weatherData.city || "City not found"}</p>
      <p className="temperature">{weatherData.temperature}°C</p>

      <div className="col">
        <img src="humidity-icon.png" alt="" className="humidity-con" />
        <div>
          <p className="weather-description">humidity</p>
          <p className="weather-details">{weatherData.humidity}°C</p>
        </div>
      </div>
      <div className="col">
        <img src="wind.png" alt="" className="wind-con" />
        <div>
          <p className="weather-description">speed of wind</p>
          <p className="weather-details">{weatherData.wind}km/h</p>
        </div>
      </div>
      <div className="col">
        <img src="weatherInfor.png" alt="" className="humidity-con" />
        <div>
          <p className="weather-description">weather Description</p>
          <p className="weather-details">{weatherData.Wdescription}</p>
        </div>
      </div>
      <div className="col">
        <img src="country.png" alt="" className="wind-con" />
        <div>
          <p className="weather-description">country</p>
          <p className="weather-details">
            {weatherData.country || "un known country"}
          </p>
        </div>
      </div>
    </div>
  );
}
