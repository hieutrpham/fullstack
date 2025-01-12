import { z } from "zod";

export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
}

export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}

export interface DiaryEntry {
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export const DiarySchema = z.object({
  date: z.string().date(),
  weather: z.nativeEnum(Weather),
  visibility: z.nativeEnum(Visibility),
  comment: z.string().optional(),
});

export type DiaryForm = z.infer<typeof DiarySchema>;
