import axios from 'axios'
import { DiaryEntry } from './types'

const baseUrl = 'http://localhost:3000/api/diaries'

export const getDiaries = async () => {
  const res = await axios.get<DiaryEntry[]>(baseUrl)
  return res.data
}