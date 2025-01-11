import { DiaryEntry } from "../types"

interface DiaryProps {
  content: DiaryEntry
}

const Diary = ({content}: DiaryProps) => {
  return (
    <>
      <p>
        <strong>{content.date}</strong>
      </p>
      {content.visibility}
      <br/>
      {content.weather}
      <br/>
      {content.comment}
    </>
  )
  
}

export default Diary