import { Patient } from "../types";

interface PropsType {
  patient: Patient;
}

const PatientView = ({ patient }: PropsType) => {
  return (
    <>
      <h2>{patient.name}</h2>
      Gender: {patient.gender} <br />
      Occupation: {patient.occupation}
    </>
  );
};

export default PatientView;
