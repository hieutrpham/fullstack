import { useForm, formOptions, FieldApi } from "@tanstack/react-form";
import { Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { CSSProperties, ReactNode } from "react";
import patientService from "../services/patients";
import { useParams } from "react-router-dom";
import { NoIdEntry } from "../types";
import { z } from "zod";

const SingleField = ({
  label,
  field,
}: {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: FieldApi<z.infer<typeof NoIdEntry>, any>;
}) => (
  <>
    <label>{label}</label>
    <TextField
      style={styles.text}
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

const NewEntry = ({
  show,
  children,
}: {
  show: boolean;
  children: ReactNode;
}) => {
  const { id } = useParams();

  const patientId = id ? id : "";

  const formOpts = formOptions<z.infer<typeof NoIdEntry>>({
    defaultValues: {
      type: "HealthCheck",
      description: "",
      date: "",
      specialist: "",
      diagnosisCodes: [],
      healthCheckRating: 0,
    },
  });

  const tsform = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      console.log(value);
      const data = await patientService.createEntry(patientId, { ...value });
      console.log(data);
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
            name="description"
            children={(field) => {
              return (
                <>
                  <SingleField label="Description" field={field} />
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
                  <SingleField label="Date" field={field} />
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
                  <SingleField label="Specialist" field={field} />
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
                  <SingleField label="Code" field={field} />
                  {field.state.meta.errors.length ? (
                    <em>{field.state.meta.errors.join(",")}</em>
                  ) : null}
                </>
              );
            }}
          />
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
            {children}
          </div>
        </form>
      </>
    );
  }
};

export default NewEntry;
