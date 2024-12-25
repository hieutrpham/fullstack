import { createSlice } from "@reduxjs/toolkit"
import services from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAction(state, action) {
      return state.map(item => 
        item.id === action.payload ? { ...item, votes: item.votes + 1 } : item
      );
    },

    appendAnecdote(state, action) {
      state.push(action.payload);
    },

    setAnecdotes(state, action) {
      return action.payload;
    },
  }
});

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await services.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const addAnecdoteAction = (content) => {
  return async dispatch => {
    const anecdote = await services.createNew(content);
    dispatch(appendAnecdote(anecdote));
  };
};

export const vote = (id, content, votes) => {
  return async dispatch => {
    const newObject = {
      content,
      id,
      votes: votes + 1
    };
    
    await services.update(id, newObject);
    dispatch(voteAction(id));
  };
};

export default anecdoteSlice.reducer;
export const { voteAction, appendAnecdote, setAnecdotes } = anecdoteSlice.actions