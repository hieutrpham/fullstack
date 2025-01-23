import { Patient } from "../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import EntryDetail from "./EntryDetail";
import CakeSharpIcon from "@mui/icons-material/CakeSharp";

const PatientView = ({ patient }: { patient: Patient }) => {
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
      <p>
        <CakeSharpIcon /> {patient.dateOfBirth} <br />
        Occupation: {patient.occupation} <br />
      </p>
      {patient.entries.length > 0 ? (
        <>
          <strong>Entries:</strong> <br />
          <EntryDetail entries={patient.entries} />
        </>
      ) : null}
    </>
  );
};

export default PatientView;
