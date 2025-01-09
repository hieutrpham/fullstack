import express from "express";
import diagnoseRouter from "./routes/diagnosesRoute";
import patientRouter from "./routes/patientRoute";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/ping", (_, res) => {
  console.log("someone pinged");
  res.send("pong");
});

app.use("/api/diagnoses", diagnoseRouter);
app.use("/api/patients", patientRouter);
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
