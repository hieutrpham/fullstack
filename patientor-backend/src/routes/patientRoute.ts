import express, { Request, Response } from "express";
import patientService from "../services/patientService";
import { Patient } from "../types";
import { newPatientParser, errorMiddleware } from "../middlewares";

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
    res.send({ ...req.body });
  }
);

router.use(errorMiddleware);

export default router;
