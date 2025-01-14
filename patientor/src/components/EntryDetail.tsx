import { useEffect, useState } from "react";
import { Entry, BaseEntry, Diagnosis } from "../types";
import patientService from "../services/patients";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Base = ({
  entry,
  diagnoses,
}: {
  entry: BaseEntry;
  diagnoses: Diagnosis[];
}) => {
  return (
    <>
      <em>Date: {entry.date}</em> <br />
      Description: {entry.description} <br />
      Specialist: {entry.specialist} <br />
      Diagnoses:{" "}
      {entry.diagnosisCodes
        ? entry.diagnosisCodes.map((code, i) => (
            <li key={i}>
              {code}: {""}
              {diagnoses.map((diagnose) =>
                diagnose.code === code ? diagnose.name : ""
              )}
            </li>
          ))
        : null}
    </>
  );
};

const EntryDetail = ({ entries }: { entries: Entry[] }) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const getData = async () => {
      const diagnoses = await patientService.getDiagnoses();
      setDiagnoses(diagnoses);
    };

    getData();
  }, []);

  return (
    <>
      {entries.map((entry, index) => {
        switch (entry.type) {
          case "HealthCheck":
            return (
              <div key={index}>
                <Base entry={entry} diagnoses={diagnoses} /> <br />
                Health Rating: {entry.healthCheckRating}
              </div>
            );
          case "Hospital":
            return (
              <div key={index}>
                <Base entry={entry} diagnoses={diagnoses} />
                Discharge date: {entry.discharge.date} <br />
                Discharge criteria: {entry.discharge.criteria}
              </div>
            );
          case "OccupationalHealthcare":
            return (
              <div key={index}>
                <Base entry={entry} diagnoses={diagnoses} />
                Employer: {entry.employerName} <br />
                Sick leave start date: {entry.sickLeave?.startDate} <br />
                Sick leave end date: {entry.sickLeave?.endDate}
              </div>
            );
          default:
            return assertNever(entry);
        }
      })}
    </>
  );
};

export default EntryDetail;
