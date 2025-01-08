import diaryData from "../../data/entries";
import { DiaryEntry, NonSensitiveDiaryEntry } from "../types";

const diaries: DiaryEntry[] = diaryData;

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const addDiary = () => {
  return null;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map((diary) => ({
    id: diary.id,
    date: diary.date,
    weather: diary.weather,
    visibility: diary.visibility,
  }));
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
};
