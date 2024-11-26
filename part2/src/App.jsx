import Note from './components/Note'
import { useState, useEffect } from 'react'
import noteServices from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])

  const [newNote, setNewNote] = useState('a new note...')

  const [showAll, setShowAll] = useState(true)

  useEffect(() => {    
    noteServices.getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }
  
    noteServices.create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const handleNoteChange = event => {setNewNote(event.target.value)}

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteServices.update(id, changedNote)
      .then(returnedNote => {
      setNotes(notes.map(n => n.id === id ? returnedNote : n))
    })
  }
 

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={
            () => toggleImportanceOf(note.id)
          }/>
        )}
      </ul>

      <form onSubmit={addNote}>
        <input value = {newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>   
    </div>
  )
}

export default App