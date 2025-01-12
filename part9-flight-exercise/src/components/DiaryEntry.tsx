import { DiaryEntry } from "../types";

interface DiaryProps {
  content: DiaryEntry;
}

const Diary = ({ content }: DiaryProps) => {
  return (
    <>
      <p>
        <strong>{content.date}</strong>
      </p>
      visibility: {content.visibility}
      <br />
      weather: {content.weather}
      <br />
      {content.comment && <>comment: {content.comment}</>}
    </>
  );
};

export default Diary;
