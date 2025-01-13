import { Diagnosis, Patient } from "../types";

interface PropsType {
  patient: Patient;
  diagnoses: Diagnosis[];
}

const PatientView = ({ patient, diagnoses }: PropsType) => {
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
              e.diagnosisCodes.map((code, i) => (
                <li key={i}>
                  {code}: {""}
                  {diagnoses.map((diagnose) =>
                    diagnose.code === code ? diagnose.name : ""
                  )}
                </li>
              ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default PatientView;
