import axios from "axios";
import { DiaryEntry } from "./types";
import { DiaryForm } from "./types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getDiaries = async () => {
  const res = await axios.get<DiaryEntry[]>(baseUrl);
  return res.data;
};

export const addDiary = async (newDiary: DiaryForm) => {
  const res = await axios.post<DiaryForm>(baseUrl, newDiary);
  return res.data;
};
