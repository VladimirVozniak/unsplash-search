import {createSlice} from "@reduxjs/toolkit";

const toolkitSlice = createSlice({
  name: "shared",
  initialState: {
    isLoading: false,
    isAuthorized: false
  },
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload
    },
    setAuth(state, action) {
      state.isAuth = action.payload
    },
    checkAuth(state,) {
      state.isAuth = localStorage.getItem("token") !== ""
    }
  }
})

export const {setLoading, setAuth, checkAuth} = toolkitSlice.actions
export default toolkitSlice.reducer