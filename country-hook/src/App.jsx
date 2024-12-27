import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')
  const onChange = (event) => {
    setValue(event.target.value)
  }
  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState('')
  const [found, setFound] = useState(true)

  useEffect(() => {
    if (!name) {
      setCountry(null)
      setFound(false)
      return
    }

    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then(response => {
        setCountry(response.data)
        setFound(true)
      })
      .catch(error => {
        console.error('error fetching data:', error)
        setCountry(null)
        setFound(false)
      })
  }, [name])

  return {found, country}
}

const Country = ({found, country}) => {
  // console.log(found, country)
  
  if (!country || !found) {
    return <div>not found...</div>
  }

  return (
    <div>
      <h3>{country.name.common} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div> 
      <img src={country.flags.png} height='100' alt={`flag of ${country.name.common}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const {found, country} = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country found={found} country={country} />
    </div>
  )
}

export default App