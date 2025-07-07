import React, { useEffect, useState } from "react";

export default function DemeWeather() {
  const [cityName, setCityName] = useState("");
  const [field, setField] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [errorName, setErrorName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async (city) => {
    setLoading(true);
    try {
      const KeyIp = "5d0d6ea0da925a8385f58316fff90457";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KeyIp}`;

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setWeatherData(data);
        setErrorName(false);
      } else {
        setWeatherData(null);
      }
    } catch (error) {
      console.error(error);
      setErrorName(error.messages);
    }
  };
  useEffect(() => {
    fetchData(cityName);
  }, [cityName]);
  const handleData = () => {
    if (field.trim() !== "") {
      setCityName(field);
      setField("");
    }
  };
  return (
    <div>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Weather App</h1>
        <input
          type="text"
          value={field}
          onChange={(e) => setField(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={handleData}>Search</button>

        {weatherData ? (
          <div style={{ marginTop: "20px" }}>
            <h2>City:{weatherData.name}</h2>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Weather: {weatherData.weather[0].description}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Country:{weatherData.sys.country}</p>
          </div>
        ) : (
          <>
            <p>{errorName}</p>
          </>
        )}
      </div>
    </div>
  );
}
