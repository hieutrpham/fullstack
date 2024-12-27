import { useState } from "react"

export const useField = (type) => {
  const [field, setField] = useState('')

  const onChange = (event) => {
    setField(event.target.value)
  }

  return {type, field, onChange}
}