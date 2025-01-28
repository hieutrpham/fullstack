import { useState } from "react";
import { Flex, Button } from "@radix-ui/themes";
import { useCountries } from "./hooks";
import Country from "./Country";
import Weather from "./Weather";

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
    <Flex direction="row" align="center">
      <form onSubmit={findCountries}>
        <input value={name} onChange={handleChange} />
        <Button type="submit" style={{ marginLeft: 10 }}>
          find
        </Button>
        {matchedCountries.length > 10 ? (
          <>too many matches</>
        ) : matchedCountries.length >= 1 ? (
          <Flex wrap="wrap">
            {matchedCountries.map((c, index) => (
              <div key={index}>{<Country name={c} />}</div>
            ))}
          </Flex>
        ) : null}
      </form>
    </Flex>
  );
};

export default App;
