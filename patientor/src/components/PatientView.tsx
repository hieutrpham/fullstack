import { Patient } from "../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import CakeSharpIcon from "@mui/icons-material/CakeSharp";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Diagnosis } from "../types";
import patientService from "../services/patients";
import CancelIcon from "@mui/icons-material/Cancel";
import NewEntry from "../components/NewEntry";
import EntryDetail from "./EntryDetail";

const PatientView = ({ patient }: { patient: Patient }) => {
  const [show, setShow] = useState(false);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const getData = async () => {
      const diagnoses = await patientService.getDiagnoses();
      setDiagnoses(diagnoses);
    };

    getData();
  }, []);

  const showNewEntry = () => setShow(!show);

  return (
    <>
      <h2>
        {patient.name}
        {patient.gender === "other" ? (
          <TransgenderIcon />
        ) : patient.gender === "male" ? (
          <MaleIcon />
        ) : (
          <FemaleIcon />
        )}
      </h2>
      <section style={{ margin: 10 }}>
        <CakeSharpIcon /> {patient.dateOfBirth} <br />
        Occupation: {patient.occupation} <br />
      </section>
      {!show ? (
        <Button onClick={showNewEntry} variant="contained">
          Create new entry
        </Button>
      ) : null}

      <NewEntry show={show} diagnoses={diagnoses}>
        <Button
          variant="contained"
          endIcon={<CancelIcon />}
          color="error"
          style={{ alignSelf: "flex-end", marginBottom: 10 }}
          onClick={() => setShow(false)}
        >
          Cancel
        </Button>
      </NewEntry>

      <section style={{ margin: 10 }}>
        {patient.entries.length > 0 ? (
          <>
            <strong>Entries:</strong> <br />
            <EntryDetail diagnoses={diagnoses} entries={patient.entries} />
          </>
        ) : null}
      </section>
    </>
  );
};

export default PatientView;
