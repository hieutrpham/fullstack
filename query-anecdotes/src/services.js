import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAnecdotes = () => 
  axios.get(baseUrl).then(res => res.data)

const addAnecdotes = (newObject) => 
  axios.post(baseUrl, newObject).then(res => res.data)

const updateAnecdotes = (updatedAnecdotes) => 
  axios.put(`${baseUrl}/${updatedAnecdotes.id}`, updatedAnecdotes)
    .then(res => res.data)

export {getAnecdotes, addAnecdotes, updateAnecdotes}