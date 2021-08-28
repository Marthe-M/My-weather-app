import React from "react";
import { Icon } from "@iconify/react";
import thermometerIcon from "@iconify-icons/wi/thermometer";

let d = new Date();

function incDay(date, n) {
  let fudate = new Date(new Date(date).setDate(new Date(date).getDate() + n));
  fudate =
    fudate.toDateString().substring(8, 10) + "/" + (fudate.getMonth() + 1);
  return fudate;
}

const Forecast = (props) => (
  <div className="forecast-day">
    {typeof props.sunrise != "undefined" ? (
      <div className="forecast-header">
        <p>{incDay(new Date(), props.index + 1)}</p>
      </div>
    ) : (
      <div className="forecast-header">
        <p>{d.getHours() + props.index + 1 + " h"}</p>
      </div>
    )}
    <div className="flex">
      <div className="temp">
        <Icon icon={thermometerIcon} /> Temp: {Math.round(props.temp)} &deg;C{" "}
        <br />
        <img
          src={`http://openweathermap.org/img/w/${props.icon}.png`}
          alt="weather icon"
        />
        <p>{props.description}</p>
      </div>
    </div>
  </div>
);

export default Forecast;
