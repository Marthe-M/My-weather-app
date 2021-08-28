import React, { useEffect, useState } from "react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import Weather from "./components/Weather.js";
import Forecast from "./components/Forecast.js";
import { Icon } from "@iconify/react";
import searchLocation from "@iconify-icons/fa-solid/search-location";

require("dotenv").config();

function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [forecast, setForecast] = useState(false);
  const [hourlyForecast, setHourlyForecast] = useState(false);
  const [cityName, setCityName] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [cityData, setCityData] = useState([]);
  const [localForecast, setLocalForecast] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(
        `${process.env.REACT_APP_API_URL}/onecall?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
      )
        .then((res) => res.json())
        .then((result) => {
          setCurrentData(result);
          console.log("Result currentData is", result);
        });
      await fetch(
        `${process.env.REACT_APP_API_URL}/weather?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
      )
        .then((res) => res.json())
        .then((result) => {
          setData(result);
          console.log("Result setData is", result);
        });
    };
    fetchData();
  }, [lat, long]);

  useEffect(() => {
    const getCityData = async () => {
      await fetch(
        `${process.env.REACT_APP_API_URL}/weather?q=${citySearch}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
      )
        .then((res) => res.json())
        .then((result) => {
          setCityData(result);
          console.log("Result setCityData is", result);
        });
    };
    getCityData();
  }, [citySearch]);

  const showForecast = () => {
    setForecast(!forecast);
    setHourlyForecast(false);
  };

  const showHourlyForecast = () => {
    setHourlyForecast(!hourlyForecast);
    setForecast(false);
  };

  const showCityForecast = (e) => {
    e.preventDefault();
    setCitySearch(cityName);
    setLocalForecast(false);
  };

  return (
    <div className="container">
      {typeof data.timezone != "undefined" && localForecast ? (
        <Weather weatherData={data} />
      ) : (
        <div></div>
      )}
      {typeof cityData.timezone != "undefined" ? (
        <Weather weatherData={cityData} />
      ) : (
        <div></div>
      )}
      <div className="selectors">
        <button onClick={() => showForecast()}>
          {!forecast ? (
            <p>Show {data.name} 6-day Forecast</p>
          ) : (
            <p>Hide {data.name} 6-day Forecast</p>
          )}
        </button>
        <button onClick={() => showHourlyForecast()}>
          {!hourlyForecast ? (
            <p>Show {data.name} 6-hour Forecast</p>
          ) : (
            <p>Hide {data.name} 6-hour Forecast</p>
          )}
        </button>

        <form onSubmit={showCityForecast}>
          <input
            type="text"
            placeholder="Search city..."
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
          <button type="submit">
            <Icon icon={searchLocation} style={{ fontSize: "20px" }} />
          </button>
        </form>
      </div>
      <div className="forecast-container">
        {forecast && typeof currentData.timezone != "undefined" ? (
          currentData.daily
            .slice(0, 6)
            .map((day, index) => (
              <Forecast
                key={index}
                index={index}
                temp={day.temp.day}
                sunrise={day.sunrise}
                description={day.weather[0].main}
                icon={day.weather[0].icon}
              />
            ))
        ) : (
          <div></div>
        )}
      </div>
      <div className="forecast-container">
        {hourlyForecast && typeof currentData.timezone != "undefined" ? (
          currentData.hourly
            .slice(0, 6)
            .map((hour, index) => (
              <Forecast
                key={index}
                index={index}
                temp={hour.temp}
                description={hour.weather[0].main}
                icon={hour.weather[0].icon}
              />
            ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default App;
