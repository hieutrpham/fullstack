import express, { Response } from "express";
import { NonSensitivePatient } from "../types";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getPatient());
});

export default router;
