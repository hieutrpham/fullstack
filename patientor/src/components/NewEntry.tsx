import { useForm, formOptions, FieldApi } from "@tanstack/react-form";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { CSSProperties, ReactNode, useState } from "react";
import patientService from "../services/patients";
import { useParams } from "react-router-dom";
import { Diagnosis, NoIdEntry } from "../types";
import { z } from "zod";

const SingleField = ({
  label,
  type,
  field,
}: {
  label: string;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: FieldApi<z.infer<typeof NoIdEntry>, any>;
}) => (
  <>
    <TextField
      label={label}
      style={styles.text}
      type={type}
      variant="standard"
      name={field.name}
      value={field.state.value}
      onChange={(e) => field.handleChange(e.target.value)}
    />
  </>
);

const styles: {
  formContainer: CSSProperties;
  button: CSSProperties;
  text: CSSProperties;
} = {
  formContainer: {
    margin: 10,
    border: "1px solid lightblue",
    padding: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "left",
  },
  button: {
    alignSelf: "flex-start",
    marginTop: 10,
  },
  text: {
    margin: 5,
  },
};

const defaultValuesByType = {
  HealthCheck: {
    type: "HealthCheck",
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: [""],
    healthCheckRating: 0,
  },
  OccupationalHealthcare: {
    type: "OccupationalHealthcare",
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: [""],
    employerName: "",
    sickLeave: {
      startDate: "",
      endDate: "",
    },
  },
  Hospital: {
    type: "Hospital",
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: [""],
    discharge: {
      date: "",
      criteria: "",
    },
  },
};

const NewEntry = ({
  show,
  diagnoses,
  children,
}: {
  show: boolean;
  diagnoses: Diagnosis[];
  children: ReactNode;
}) => {
  const { id } = useParams();
  const [selectedType, setSelectedType] =
    useState<keyof typeof defaultValuesByType>("HealthCheck");

  const [diagnosesCode, setDiagnosesCode] = useState<string[]>([]);

  const patientId = id ? id : "";

  const formOpts = formOptions<z.infer<typeof NoIdEntry>>({
    defaultValues: defaultValuesByType[selectedType] as z.infer<
      typeof NoIdEntry
    >,
  });

  const tsform = useForm({
    ...formOpts,

    onSubmit: async ({ value }) => {
      console.log(value);
      await patientService.createEntry(patientId, {
        ...value,
        diagnosisCodes: diagnosesCode,
      });
    },

    validators: {
      onSubmit: NoIdEntry,
    },
  });

  if (show) {
    return (
      <>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            tsform
              .handleSubmit()
              .catch((error) => console.log("validation error", error));
          }}
          style={styles.formContainer}
        >
          <tsform.Field
            name="type"
            children={(field) => {
              return (
                <>
                  <Select
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(
                        e.target.value as keyof typeof defaultValuesByType
                      );
                      setSelectedType(
                        e.target.value as keyof typeof defaultValuesByType
                      );
                    }}
                  >
                    <MenuItem value="HealthCheck">Health Check</MenuItem>
                    <MenuItem value="OccupationalHealthcare">
                      Occupational Healthcare
                    </MenuItem>
                    <MenuItem value="Hospital">Hospital</MenuItem>
                  </Select>
                </>
              );
            }}
          />
          <tsform.Field
            name="description"
            children={(field) => {
              return (
                <>
                  <SingleField label="Description" field={field} type="text" />
                  {field.state.meta.errors.length ? (
                    <em>{field.state.meta.errors.join(",")}</em>
                  ) : null}
                </>
              );
            }}
          />

          <tsform.Field
            name="date"
            children={(field) => {
              return (
                <>
                  <SingleField label="" field={field} type="date" />
                  {field.state.meta.errors.length ? (
                    <em>{field.state.meta.errors.join(",")}</em>
                  ) : null}
                </>
              );
            }}
          />
          <tsform.Field
            name="specialist"
            children={(field) => {
              return (
                <>
                  <SingleField label="Specialist" field={field} type="text" />
                  {field.state.meta.errors.length ? (
                    <em>{field.state.meta.errors.join(",")}</em>
                  ) : null}
                </>
              );
            }}
          />
          <tsform.Field
            name="diagnosisCodes"
            children={(field) => {
              return (
                <>
                  <Select
                    label="Codes"
                    value={diagnosesCode}
                    multiple
                    onChange={(e) =>
                      setDiagnosesCode(
                        typeof e.target.value === "string"
                          ? e.target.value.split(",")
                          : e.target.value
                      )
                    }
                  >
                    {diagnoses.map((d) => (
                      <MenuItem key={d.code} value={d.code}>
                        {d.code}
                      </MenuItem>
                    ))}
                  </Select>

                  {field.state.meta.errors.length ? (
                    <em>{field.state.meta.errors.join(",")}</em>
                  ) : null}
                </>
              );
            }}
          />

          {selectedType === "HealthCheck" && (
            <tsform.Field
              name="healthCheckRating"
              children={(field) => {
                return (
                  <>
                    <TextField
                      label="Rating"
                      style={styles.text}
                      type="number"
                      variant="standard"
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                    />
                    {field.state.meta.errors.length ? (
                      <em>{field.state.meta.errors.join(",")}</em>
                    ) : null}
                  </>
                );
              }}
            />
          )}

          {selectedType === "Hospital" && (
            <>
              <tsform.Field
                name="discharge.date"
                children={(field) => {
                  return (
                    <>
                      <TextField
                        label="Discharge Date"
                        type="date"
                        name={field.name}
                        value={field.state.value || ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {field.state.meta.errors.length ? (
                        <em>{field.state.meta.errors.join(",")}</em>
                      ) : null}
                    </>
                  );
                }}
              />
              <tsform.Field
                name="discharge.criteria"
                children={(field) => {
                  return (
                    <>
                      <TextField
                        label="Criteria"
                        type="text"
                        name={field.name}
                        value={field.state.value || ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {field.state.meta.errors.length ? (
                        <em>{field.state.meta.errors.join(",")}</em>
                      ) : null}
                    </>
                  );
                }}
              />
            </>
          )}

          {selectedType === "OccupationalHealthcare" && (
            <>
              <tsform.Field
                name="employerName"
                children={(field) => {
                  return (
                    <>
                      <TextField
                        label="Employer"
                        type="text"
                        value={field.state.value || ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {field.state.meta.errors.length ? (
                        <em>{field.state.meta.errors.join(",")}</em>
                      ) : null}
                    </>
                  );
                }}
              />
              <tsform.Field
                name="sickLeave.startDate"
                children={(field) => {
                  return (
                    <>
                      <label>Start date</label>
                      <TextField
                        type="date"
                        value={field.state.value || ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {field.state.meta.errors.length ? (
                        <em>{field.state.meta.errors.join(",")}</em>
                      ) : null}
                    </>
                  );
                }}
              />
              <tsform.Field
                name="sickLeave.endDate"
                children={(field) => {
                  return (
                    <>
                      <label>End date</label>
                      <TextField
                        type="date"
                        value={field.state.value || ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {field.state.meta.errors.length ? (
                        <em>{field.state.meta.errors.join(",")}</em>
                      ) : null}
                    </>
                  );
                }}
              />
            </>
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              style={styles.button}
            >
              Submit
            </Button>

            {/*Cancel button here*/}
            {children}
          </div>
        </form>
      </>
    );
  }
};

export default NewEntry;
