import {useState, useEffect} from 'react'
import { getDiaries } from './service'
import { DiaryEntry } from './types'
import Diary from './components/DiaryEntry'

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    getDiaries().then(data => setDiaries(data))
  }, [])

  return (
    <>
      <h2>Diary Entries</h2>
      {diaries.map(d => <Diary key={d.id} content={d}/>)}
    </>
  )
}

export default App