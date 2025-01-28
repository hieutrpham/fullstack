import { getWeather } from "./utils";
import { useState, useEffect } from "react";

const Weather = ({ lat, lon }) => {
  const [temp, setTemp] = useState("");
  const [wind, setWind] = useState("");
  const [icon, setIcon] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    getWeather(lat, lon).then((res) => {
      setTemp(res.current.temp_c);
      setWind(res.current.wind_kph);
      setIcon(res.current.condition.icon);
      setLocation(res.location.name);
    });
  }, [lat, lon]);

  return (
    <>
      <h3>Weather in {location}</h3>
      <em>Temperature: </em>
      {temp} Celcius
      <p>
        <img src={icon} />
      </p>
      <p>
        <em>Wind: </em> {wind} kph
      </p>
    </>
  );
};

export default Weather;
