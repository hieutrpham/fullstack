import Note from './components/Note'
import { useState, useEffect } from 'react'
import noteServices from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'
import Login from './components/Login'
import loginService from './services/login'

const App = () => {
  const [notes, setNotes] = useState(null)
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {    
    noteServices.getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteServices.setToken(user.token)
    }
  }, [])

  if (!notes) {return null}

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

  const handleNoteChange = event => {    
    setNewNote(event.target.value)
  }

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
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService({username, password})
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      noteServices.setToken(user.token)
      
      setUser(user)
      setUsername('')
      setPassword('')

    } catch(exeption) {
      console.log(exeption)      
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }   
  }

  const handleUserChange = event => {
    setUsername(event.target.value)
  }

  const handlePwChange = event => {
    setPassword(event.target.value)   
  }

  const loginForm = () => (
    <Login handleLogin={handleLogin} username={username} userChange={handleUserChange}
    password={password} pwChange={handlePwChange}
    />
  )

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input className='newNote' value = {newNote} onChange={handleNoteChange}/>
      <button type="submit">save</button>
    </form> 
  )
 
  
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {user === null ? loginForm() :
      <div>
        <p>{user.name} logged-in</p>
        {noteForm()}    
      </div>
      }

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

      <Footer />  
    </div>
  )
}

export default App