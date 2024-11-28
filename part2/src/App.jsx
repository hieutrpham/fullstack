import { useState, useEffect } from 'react'
import api from './services/apicall'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState(null)

  const [newCountry, setNewCountry] = useState('enter a country name')


  useEffect(() => {    
    api.getCountry('finland').then(result => {setCountries(result)})
    .catch(err => {console.log(err)
    })

  }, [])

  if (!countries) {return null}


  const handleCountryChange = event => {
    setNewCountry(event.target.value)
  }
  
  api.getCountry(newCountry)
  .then(res => setCountries(res))
  .catch(err => console.log(err))

  return (
    <>
      <form>
        find countries: <input value = {newCountry} onChange={handleCountryChange}/>
      </form> 

      <Country country={countries}/>
    </>
  )
}

export default App