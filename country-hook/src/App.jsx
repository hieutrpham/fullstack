import { useState } from "react";
import { Flex, Button } from "@radix-ui/themes";
import { useCountries } from "./hooks";
import Country from "./Country";

const App = () => {
  const [name, setName] = useState("");
  const [matchedCountries, setMatchCountries] = useState([]);
  const countries = useCountries();

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const findCountries = (e) => {
    e.preventDefault();
    const list = countries.filter((c) => c.toLowerCase().includes(name));
    setMatchCountries(list);
  };

  return (
    <Flex direction="column" align="center">
      <form onSubmit={findCountries}>
        <input value={name} onChange={handleChange} />
        <Button type="submit" style={{ marginLeft: 10 }}>
          find
        </Button>
        {matchedCountries.length > 10 ? (
          <>too many matches</>
        ) : matchedCountries.length > 1 ? (
          <ul>
            {matchedCountries.map((c, index) => (
              <li key={index}>{c}</li>
            ))}
          </ul>
        ) : null}
      </form>
      {matchedCountries.length === 1 ? (
        <Country name={matchedCountries} />
      ) : null}
    </Flex>
  );
};

export default App;
