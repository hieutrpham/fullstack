import { createSlice } from "@reduxjs/toolkit"
import services from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      state.map(item => {
        item.id === action.payload 
        ? {...item, votes: item.votes++}
        : item
      })
    },

    appendAnecdote(state, action) {
      state.push(action.payload)
    },

    setAnecdotes(state, action) {
      return action.payload
    },
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await services.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdoteAction = (content) => {
  return async dispatch => {
    const anecdote = await services.createNew(content)
    dispatch(appendAnecdote(anecdote))
  }
}

export default anecdoteSlice.reducer
export const { vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions