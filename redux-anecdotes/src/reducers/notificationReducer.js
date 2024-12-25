import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'noti',
  initialState: '',
  reducers: {
    setNoti(state, action) {
      return action.payload
    },

    resetNoti() {
      return ''
    }
  }
})

export const actionNoti = (content, timeout) => {
  return async dispatch => {
    await dispatch(setNoti(content))
    
    setTimeout(() => {
      dispatch(resetNoti())
    }, timeout);
    
  }
}

export default notificationSlice.reducer
export const {setNoti, resetNoti} = notificationSlice.actions