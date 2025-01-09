import { NonSensitivePatient } from "../types";
import patientData from "../../data/patients";

const getPatient = (): NonSensitivePatient[] => {
  return patientData.map((p) => ({
    id: p.id,
    name: p.name,
    dateOfBirth: p.dateOfBirth,
    gender: p.gender,
    occupation: p.occupation,
  }));
};

export default {
  getPatient,
};
