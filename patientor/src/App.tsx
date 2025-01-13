import { useState, useEffect } from "react";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";
import { Diagnosis, Patient } from "./types";
import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientView from "./components/PatientView";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  const match = useMatch("api/patients/:id");
  const patient = match ? patients.find((i) => i.id === match.params.id) : null;

  useEffect(() => {
    const fetchData = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);

      const diagnoses = await patientService.getDiagnoses();
      setDiagnoses(diagnoses);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route
            path="/"
            element={
              <PatientListPage patients={patients} setPatients={setPatients} />
            }
          />
          <Route
            path="api/patients/:id"
            element={
              patient ? (
                <PatientView patient={patient} diagnoses={diagnoses} />
              ) : (
                <>Loading...</>
              )
            }
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
