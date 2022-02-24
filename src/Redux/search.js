import {createSlice} from "@reduxjs/toolkit";

const toolkitSlice = createSlice({
  name: "search",
  initialState: {
    text: "",
    history: [],
    focus: false
  },
  reducers: {
    changeText(state, action) {
      state.text = action.payload
    },
    changeHistory(state, action) {
      state.history = [...action.payload]
    },
    changeFocusOnSearch(state, action) {
      state.focus = action.payload
    }
  }
})

export const {changeText, changeHistory, changeFocusOnSearch} = toolkitSlice.actions
export default toolkitSlice.reducer