import { useQuery } from "@apollo/client";
import { ALL_PERSONS } from "./queries";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import { useState } from "react";
import PhoneForm from "./components/PhoneForm";

const App = () => {
  const result = useQuery(ALL_PERSONS);
  const [errorMessage, setErrorMessage] = useState(null);

  if (result.loading) {
    return <div>loading...</div>;
  }

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  );
};

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

export default App;
