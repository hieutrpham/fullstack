import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'noti',
  initialState: 'first noti',
  reducers: {
    initNoti(state) {
      return state
    }
  }
})

export default notificationSlice.reducer