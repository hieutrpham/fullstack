import axios from 'axios'
const baseUrl = '/api/notes'

const getAll = async () => {
    const request = await axios.get(baseUrl)        
    return request.data
}

const create = async newObject => {
  const request = axios.post(baseUrl, newObject)
  const response = await request
  return response.data
}

const update = async (id, newObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObject)
  return request.data
}

export default { getAll, create, update }