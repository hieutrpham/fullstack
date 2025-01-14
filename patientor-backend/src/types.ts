import { z } from "zod";

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export const Diagnosis = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional(),
});

const BaseEntry = z.object({
  id: z.string(),
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(Diagnosis.shape.code).optional(),
});

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export const HealthCheckRatingEnum = z.nativeEnum(HealthCheckRating);

export const HealthCheckEntry = BaseEntry.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: HealthCheckRatingEnum,
});

export const OccupationalHealthcareEntry = BaseEntry.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string(),
      endDate: z.string(),
    })
    .optional(),
});

export const HospitalEntry = BaseEntry.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string(),
    criteria: z.string(),
  }),
});

export type Entry =
  | z.infer<typeof HealthCheckEntry>
  | z.infer<typeof OccupationalHealthcareEntry>
  | z.infer<typeof HospitalEntry>;

export const NoIdEntry = z.discriminatedUnion("type", [
  HealthCheckEntry.omit({ id: true }),
  OccupationalHealthcareEntry.omit({ id: true }),
  HospitalEntry.omit({ id: true }),
]);

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
};

export type NonSensitivePatient = Omit<Patient, "ssn">;

export const NewPatient = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});
