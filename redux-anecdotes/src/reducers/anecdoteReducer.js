import { createSlice, current } from "@reduxjs/toolkit"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    vote(state, action) {
      // console.log('vote', action)
      // console.log('state', current(state))

      // state.forEach(item => {
      //   if (item.id === action.payload) {
      //     item.votes++
      //   }
      // })
      // console.log(action.payload)
      
      state.map(item => {
        item.id === action.payload 
        ? {...item, votes: item.votes++}
        : item
      })
    },

    addAnecdoteAction(state, action) {
      console.log(current(state), 'action', action)

      const newAnecdote = {
        content: action.payload,
        id: getId(),
        votes: 0
      }
      return [...state, newAnecdote]
    }
  }
})

// export const vote = (id) => {
//   return {
//     type: 'VOTE',
//     id: id
//   }  
// }

// export const addAnecdoteAction = (content) => {
//   return {
//     type: 'ADD',
//     content: content,
//     votes: 0
//   }
// }

// const anecdoteReducer = (state = initialState, action) => {
//   switch(action.type) {
//     case 'VOTE':    
//       return state.map(state => {
//         if (state.id === action.id) {        
//           state.votes ++
//           return state
//         } else return state
//       })
//     case 'ADD':    
//       const newAnecdote = {
//         content: action.content,
//         id: getId(),
//         votes: 0
//       }
//       return [...state, newAnecdote]
//   }
//   return state
// }

export default anecdoteSlice.reducer
export const { vote, addAnecdoteAction } = anecdoteSlice.actions