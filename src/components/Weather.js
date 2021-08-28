import React from "react";
import moment from "moment";
import { Icon } from "@iconify/react";
import sunriseIcon from "@iconify-icons/wi/sunrise";
import sunsetIcon from "@iconify-icons/wi/sunset";
import thermometerIcon from "@iconify-icons/wi/thermometer";
import humidityIcon from "@iconify-icons/wi/humidity";
import strongWind from "@iconify-icons/wi/strong-wind";
import { Button } from "semantic-ui-react";

const refresh = () => {
  window.location.reload();
};

const ShowWeather = ({ weatherData }) => (
  <div className="main">
    <div className="top">
      <div className="header">Location: {weatherData.name}</div>
      <Button
        className="button-refresh"
        inverted
        color="blue"
        circular
        icon="refresh"
        onClick={refresh}
      />
    </div>
    <div className="flex">
      <div className="day">
        <p>{moment().format("dddd")}</p>
        <p>{moment().format("L")}</p>
      </div>
      <div className="description">
        {weatherData.weather[0].main}
        <img
          src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
          alt="weather icon"
          className="weather-image"
        />
      </div>
    </div>

    <div className="flex">
      <div className="temp">
        <Icon icon={thermometerIcon} /> Temperature:{" "}
        {Math.round(weatherData.main.temp)} &deg;C
      </div>
      <div className="temp">
        <Icon icon={humidityIcon} /> Humidity: {weatherData.main.humidity} %
      </div>
    </div>

    <div className="flex">
      <div className="temp">
        <Icon icon={thermometerIcon} /> Feels like:{" "}
        {Math.round(weatherData.main.feels_like)} &deg;C
      </div>
      <div className="temp">
        <Icon icon={strongWind} /> Wind: {weatherData.wind.speed} km/h
      </div>
    </div>

    <div className="flex">
      <div className="sunrise-sunset">
        <Icon icon={sunriseIcon} /> Sunrise:{" "}
        {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString("en-GB")}
      </div>
      <div className="sunrise-sunset">
        <Icon icon={sunsetIcon} /> Sunset:{" "}
        {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString("en-GB")}
      </div>
    </div>
  </div>
);

export default ShowWeather;
