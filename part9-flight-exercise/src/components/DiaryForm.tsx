import React from "react";

interface DiaryFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  date: string;
  onDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  weather: string;
  onWeatherChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  visibility: string;
  onVisibilityChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  comment: string;
  onCommentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DiaryForm: React.FC<DiaryFormProps> = ({
  onSubmit,
  date,
  onDateChange,
  weather,
  onWeatherChange,
  visibility,
  onVisibilityChange,
  comment,
  onCommentChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      Date: <input type="date" value={date} onChange={onDateChange} /> <br />
      Visibility: <input value={visibility} onChange={onVisibilityChange} />
      <br />
      Weather: <input value={weather} onChange={onWeatherChange} />
      <br />
      Comment: <input value={comment} onChange={onCommentChange} />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default DiaryForm;
