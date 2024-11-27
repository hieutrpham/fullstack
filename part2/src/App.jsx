import { useState, useEffect } from 'react'
import api from './services/apicall'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState([])

  const [newCountry, setNewCountry] = useState('enter a country name')

  useEffect(() => {    
    api.getAll().then(result => {setCountries(result)})
    .catch(err => {console.log(err)
    })
  }, [])

  console.log(countries.languages)
  
  // const handleCountryChange = event => {setNewCountry(event.target.value)} 

  return (
    <>
      <form>
        {/* <input value = {newCountry} onChange={handleCountryChange}/> */}
      </form> 

      {/* <Country country={countries}/> */}
    </>
  )
}

export default App