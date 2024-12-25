import Notes from "./components/Notes"
import NewNote from "./components/NewNote"
import VisibilityFilter from './components/VisibilityFilter'

import {useEffect} from 'react'
import { initializeNotes } from "./reducers/noteReducer"
import {useDispatch} from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeNotes())
  }, [])

  return(
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App