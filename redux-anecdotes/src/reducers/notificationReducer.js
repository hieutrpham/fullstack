import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'noti',
  initialState: '',
  reducers: {
    voteNoti(state, action) {

      // console.log(action)
      
      const payload = action.payload || ''
      
      return `you voted '${payload}'`
    },

    createNoti(state, action) {
      return `you created note '${action.payload}'`
      
    },

    resetNoti() {
      return ''
    }
  }
})


export default notificationSlice.reducer
export const {voteNoti, createNoti, resetNoti} = notificationSlice.actions