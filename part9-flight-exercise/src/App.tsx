import { useState, useEffect, SyntheticEvent, ChangeEvent } from "react";
import { addDiary, getDiaries } from "./service";
import { DiaryEntry, DiarySchema } from "./types";
import Diary from "./components/DiaryEntry";
import { ZodError } from "zod";
import { Weather, Visibility } from "./types";

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
  const [visibility, setVisibility] = useState<Visibility | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
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
          visibility: visibility,
          weather: weather,
          comment: comment.value,
        })
      );
      setDiaries((prev) => prev.concat(newEntry));
    } catch (err) {
      if (err instanceof ZodError) {
        console.log(visibility);
        const notification = err.issues.map((i) => i.message).join("\n");
        setNoti(notification);
      }
    }
  };

  const handleVisibilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVisibility(e.target.value as Visibility);
  };

  const handleWeatherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeather(e.target.value as Weather);
  };

  return (
    <>
      <h2>Add new entry</h2>
      <p>{noti}</p>

      <form onSubmit={handleSubmit}>
        Date: <input type="date" value={date.value} onChange={date.onChange} />{" "}
        <br />
        Visibility:
        {Object.values(Visibility).map((v) => (
          <label key={v}>
            <input
              type="radio"
              value={v}
              checked={visibility === v}
              onChange={handleVisibilityChange}
            />
            {v}
          </label>
        ))}
        <br />
        Weather:
        {Object.values(Weather).map((v) => (
          <label key={v}>
            <input
              type="radio"
              value={v}
              checked={weather === v}
              onChange={handleWeatherChange}
            />
            {v}
          </label>
        ))}
        <br />
        Comment: <input value={comment.value} onChange={comment.onChange} />
        <br />
        <button type="submit">add diary</button>
      </form>

      <h2>Diary Entries</h2>
      {diaries.map((d, index) => (
        <Diary key={index} content={d} />
      ))}
    </>
  );
};

export default App;
