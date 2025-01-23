import { useEffect, useState, CSSProperties } from "react";
import { Entry, BaseEntry, Diagnosis } from "../types";
import patientService from "../services/patients";
import EventSharpIcon from "@mui/icons-material/EventSharp";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";

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
      <em>
        <EventSharpIcon style={{ marginTop: 10 }} /> {entry.date}
      </em>
      Description: {entry.description} <br />
      Specialist: {entry.specialist} <br />
      {entry.diagnosisCodes ? (
        <>
          Diagnoses:
          {entry.diagnosisCodes.map((code, i) => (
            <li key={i}>
              {code}: {""}
              {diagnoses.map((diagnose) =>
                diagnose.code === code ? diagnose.name : ""
              )}
            </li>
          ))}
        </>
      ) : null}
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
              <div key={index} style={styles.container}>
                <Base entry={entry} diagnoses={diagnoses} /> <br />
                <FavoriteSharpIcon
                  style={{
                    color: healthCheckColors[entry.healthCheckRating] || "red",
                  }}
                />
              </div>
            );
          case "Hospital":
            return (
              <div key={index} style={styles.container}>
                <Base entry={entry} diagnoses={diagnoses} />
                Discharge date: {entry.discharge.date} <br />
                Discharge criteria: {entry.discharge.criteria}
              </div>
            );
          case "OccupationalHealthcare":
            return (
              <div key={index} style={styles.container}>
                <Base entry={entry} diagnoses={diagnoses} />
                Employer: {entry.employerName} <br />
                {entry.sickLeave?.startDate ? (
                  <>Sick leave start date: {entry.sickLeave?.startDate} </>
                ) : null}
                <br />
                {entry.sickLeave?.endDate ? (
                  <>Sick leave end date: {entry.sickLeave?.endDate} </>
                ) : null}
              </div>
            );
          default:
            return assertNever(entry);
        }
      })}
    </>
  );
};

const styles: { container: CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    borderRadius: 5,
    margin: 10,
    border: "2px solid lightblue",
  },
};

const healthCheckColors = {
  0: "green",
  1: "yellow",
  2: "red",
  3: "black",
};

export default EntryDetail;
