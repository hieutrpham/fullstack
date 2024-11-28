import { useState, useEffect } from 'react'
import api from './services/apicall'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState([])

  const [newCountry, setNewCountry] = useState('enter a country name')

  // console.log('1st render', Object.entries(countries))

  useEffect(() => {    
    api.getAll().then(result => {setCountries(result)})
    .catch(err => {console.log(err)
    })

    // console.log('api call')
    
  }, [])

  console.log(countries)
  

  // console.log('2nd render: country length', Object.entries(countries).length)
  
  // const handleCountryChange = event => {setNewCountry(event.target.value)} 

  return (
    <>
      <form>
        {/* <input value = {newCountry} onChange={handleCountryChange}/> */}
      </form> 

      <Country country={countries}/>
    </>
  )
}

export default App