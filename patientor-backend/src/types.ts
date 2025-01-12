import { z } from "zod";

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

export interface Entry {}

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
};

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export const NewPatient = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});
