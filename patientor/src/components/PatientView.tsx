import { Patient } from "../types";

interface PropsType {
  patient: Patient;
}

const PatientView = ({ patient }: PropsType) => {
  return (
    <>
      <h2>{patient.name}</h2>
      Gender: {patient.gender} <br />
      Occupation: {patient.occupation} <br />
      Entries: <br />
      {patient.entries.map((e, i) => (
        <div key={i}>
          <strong>{e.date}: </strong>
          <em>{e.description}</em>
          <ul>
            {e.diagnosisCodes &&
              e.diagnosisCodes.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>
      ))}
    </>
  );
};

export default PatientView;
