import express, { NextFunction, Request, Response } from "express";
import patientService from "../services/patientService";
import { NewPatient, Patient } from "../types";
import { z } from "zod";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPatient());
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatient.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, Patient>, res: Response<Patient>) => {
    res.send({ ...req.body });
  }
);

router.use(errorMiddleware);

export default router;
