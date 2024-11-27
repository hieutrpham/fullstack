import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import service from './services/service'
import {Notification, Error} from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filterName, setFilterName] = useState('')
  const [noti, setNoti] = useState('')
  const [err, setErr] = useState('')

  useEffect(() => {
      service.getAll()
        .then(initPerson => setPersons(initPerson))      
      console.log('render')
    },[])

  useEffect(() => {
    console.log('persons state changed:', persons)
    }, [persons])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    // check if person exists and replace phone number
    if (persons.map(person => person.name.toLowerCase())
      .includes(newName.toLowerCase())) {
        if (window.confirm(`${newName} is already added to the phonebook, 
          replace the old number with a new one?`)) {
            const newData = {
              name: newName,
              number: newNumber
            }

            const newId = persons.find(n => n.name === newName).id

            service.update(newId, newData)
              .then(res => setPersons(persons.map(p => p.id===newId ? res : p)))
              .then(() => {
                setNoti(`phone number of ${newName} successfuly updated`)
                setTimeout(() => {
                  setNoti(null)
                }, 3000);
              })
          }
      }
    
    // if not create new record
    else {
      service.create(newPerson)
        .then(returnedPerson => {setPersons(persons.concat(returnedPerson))})
        .then(() => {
          setNoti(`${newPerson.name} successfully added`)
          setTimeout(() => {
            setNoti(null)
          }, 3000);
        })
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

  const handleDelete = (id) => {
    if (window.confirm('do you wanna delete')) {
    service.remove(id)
    .then(() => {
      setPersons(persons.filter(person => person.id !== id))
      setNoti('deleted successfully')
    })
    .catch(() => {
      setErr(`information of ${persons.find(id => id===id).name} has already been removed from server`)
    }
  )}
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={noti}/>
      <Error message={err}/>
      
      <Filter filterValue={filterName} onChange={handleFilter} onKeyDown={handleKeyDown}/>

      <h2>Add a new</h2>

      <PersonForm addPerson={addPerson} newName={newName} handleChangeName={handleChangeName}
      newNumber={newNumber} handleChangeNumber={handleChangeNumber}
      />

      <h2>Numbers</h2>

      <Persons personToShow={personToShow} onDelete={handleDelete}/>

    </div>
  )
}

export default App