import express, { Response } from "express";
import diaryService from "../services/diaryService";
import { NonSensitiveDiaryEntry } from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
  res.send(diaryService.getNonSensitiveEntries());
});

router.post("/", (_req, res) => {
  res.send("Saving a diary!");
});

export default router;
