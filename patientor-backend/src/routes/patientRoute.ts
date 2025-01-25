import express, { Request, Response } from "express";
import patientService from "../services/patientService";
import { Patient } from "../types";
import {
  newPatientParser,
  errorMiddleware,
  newEntryParser,
} from "../middlewares";
import patients from "../../data/patients";
import { v1 } from "uuid";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPatient());
});

router.get("/:id", (req, res) => {
  res.send(patientService.getSinglePatient(req.params.id));
});

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, Patient>, res: Response<Patient>) => {
    patients.concat({ ...req.body, id: v1() });
    res.send({ ...req.body, id: v1() });
  }
);

router.post("/:id/entries", newEntryParser, (req, res) => {
  console.log(req.body);
  const patient = patients.find((p) => p.id === req.params.id);
  patient?.entries.concat({ ...req.body });
  res.send({ ...req.body });
});

router.use(errorMiddleware);

export default router;
