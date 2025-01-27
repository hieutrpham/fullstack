import { useState, useEffect } from "react";
import axios from "axios";

export const useField = (type) => {
  const [value, setValue] = useState("");
  const onChange = (event) => {
    setValue(event.target.value);
  };
  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = (name) => {
  const [country, setCountry] = useState("");
  const [found, setFound] = useState(true);

  useEffect(() => {
    if (!name) {
      setCountry(null);
      setFound(false);
      return;
    }

    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then((response) => {
        setCountry(response.data);
        setFound(true);
      })
      .catch((error) => {
        console.error("error fetching data:", error);
        setCountry(null);
        setFound(false);
      });
  }, [name]);

  return { found, country };
};

export const useCountries = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get("https://studies.cs.helsinki.fi/restcountries/api/all")
        .then((res) => setCountries(res.data.map((d) => d.name.common)));
    };

    getData();
  }, []);

  return countries;
};
