import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
  name: 'filter',
  initialState: null,
  reducers: {
    filterChange(state, action) {
      console.log(state, action)
      
      if (action.payload) {
        return action.payload
      }
      return state
    }
  }
})

// const filterReducer = (state = null, action) => {
//   // console.log(action)
  
//   switch (action.type) {
//     case 'SET_FILTER':
//       return action.payload
//     default:
//       return state
//   }
// }

// export const filterChange = filter => {
//   return {
//     type: 'SET_FILTER',
//     payload: filter
//   }
// }

export default filterSlice.reducer
export const {filterChange} = filterSlice.actions