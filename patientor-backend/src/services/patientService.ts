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

const getSinglePatient = (id: string) => {
  const p = patientData.find((i) => i.id === id);
  if (p) {
    return {
      id: p.id,
      name: p.name,
      dateOfBirth: p.dateOfBirth,
      gender: p.gender,
      occupation: p.occupation,
      entries: p.entries,
    };
  } else {
    return { error: "not found" };
  }
};

export default {
  getPatient,
  getSinglePatient,
};
