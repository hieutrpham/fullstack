import axios from "axios";
import { useState, useEffect } from "react";

const Country = ({ name }) => {
  const [country, setCountry] = useState("");

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
        <h3>{country.name.common} </h3>
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
      </div>
    );
  }
};

export default Country;
