import { createSlice, current } from "@reduxjs/toolkit"

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

    addAnecdoteAction(state, action) {
      state.push(action.payload)
    },

    setAnecdotes(state, action) {
      return action.payload
    },
  }
})


export default anecdoteSlice.reducer
export const { vote, addAnecdoteAction, setAnecdotes } = anecdoteSlice.actions