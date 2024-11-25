import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {setPersons(response.data)})
    }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (persons.map(person => person.name.toLowerCase()).includes(newName.toLowerCase())) {
      alert(`${newName} is already added to the phonebook`)
    }
    else {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const personToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase() === filterName.toLowerCase())

  const handleFilter = (event) => {
    setFilterName(event.target.value)
  } 

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setShowAll(!showAll)
    }    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter filterValue={filterName} onChange={handleFilter} onKeyDown={handleKeyDown}/>

      <h2>Add a new</h2>

      <PersonForm addPerson={addPerson} newName={newName} handleChangeName={handleChangeName}
      newNumber={newNumber} handleChangeNumber={handleChangeNumber}
      />

      <h2>Numbers</h2>

      <Persons personToShow={personToShow}/>

    </div>
  )
}

export default App