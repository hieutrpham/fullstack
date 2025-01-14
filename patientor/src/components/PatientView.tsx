import { Patient } from "../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import EntryDetail from "./EntryDetail";

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
      DOB: {patient.dateOfBirth} <br />
      Occupation: {patient.occupation} <br />
      Entries: <br />
      <EntryDetail entries={patient.entries} />
    </>
  );
};

export default PatientView;
