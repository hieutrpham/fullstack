import axios from "axios";
import { useState, useEffect } from "react";
import Weather from "./Weather";

const Country = ({ name }) => {
  const [country, setCountry] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!name) {
      setCountry(null);
      return;
    }
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then((response) => {
        setCountry(response.data);
      })
      .catch((error) => {
        console.error("error fetching data:", error);
        setCountry(null);
      });
  }, [name]);

  if (country) {
    return (
      <div>
        <h3>
          {country.name.common}
          <button style={{ marginLeft: 10 }} onClick={() => setShow(!show)}>
            show
          </button>
        </h3>
        <div style={{ display: !show ? "none" : null }}>
          <div>
            <strong>capital:</strong> {country.capital}{" "}
          </div>
          <div>
            <strong>area:</strong> {country.area}
          </div>
          <div>
            <strong>population:</strong> {country.population}
          </div>
          <div>
            <strong>language</strong>
            {
              <ul>
                {Object.values(country.languages).map((i, index) => (
                  <li key={index}>{i}</li>
                ))}
              </ul>
            }
          </div>
          <img
            src={country.flags.png}
            height="100"
            alt={`flag of ${country.name.common}`}
          />
          {country.capitalInfo.latlng ? (
            <Weather
              lat={country.capitalInfo.latlng[0]}
              lon={country.capitalInfo.latlng[1]}
            />
          ) : null}
        </div>
      </div>
    );
  }
};

export default Country;
