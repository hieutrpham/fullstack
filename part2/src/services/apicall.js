import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'

const countryUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/finland'

const getCountry = (countryName) => {
  const r = axios.get(`${baseUrl}/${countryName}`)
  return r.then(res => res.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getCountry, create, update }