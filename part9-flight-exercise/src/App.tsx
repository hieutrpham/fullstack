import { useState, useEffect, SyntheticEvent, ChangeEvent } from "react";
import { addDiary, getDiaries } from "./service";
import { DiaryEntry, DiarySchema } from "./types";
import Diary from "./components/DiaryEntry";
import DiaryForm from "./components/DiaryForm";
import { ZodError } from "zod";

const useField = (type: string) => {
  const [value, setValue] = useState("");
  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);
  return { type, value, onChange };
};

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [noti, setNoti] = useState<string>("");
  const date = useField("date");
  const visibility = useField("text");
  const weather = useField("text");
  const comment = useField("text");

  useEffect(() => {
    getDiaries().then((data) => setDiaries(data));
  }, []);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const newEntry = await addDiary(
        DiarySchema.parse({
          date: date.value,
          visibility: visibility.value,
          weather: weather.value,
          comment: comment.value,
        })
      );
      setDiaries((prev) => prev.concat(newEntry));
    } catch (err) {
      if (err instanceof ZodError) {
        const notification = err.issues.map((i) => i.message).join("\n");
        setNoti(notification);
      }
    }
  };

  return (
    <>
      <h2>Add new entry</h2>
      <p>{noti}</p>
      <DiaryForm
        onSubmit={handleSubmit}
        date={date.value}
        visibility={visibility.value}
        weather={weather.value}
        comment={comment.value}
        onDateChange={date.onChange}
        onVisibilityChange={visibility.onChange}
        onWeatherChange={weather.onChange}
        onCommentChange={comment.onChange}
      />
      <h2>Diary Entries</h2>
      {diaries.map((d, index) => (
        <Diary key={index} content={d} />
      ))}
    </>
  );
};

export default App;
