import {createSlice} from "@reduxjs/toolkit";

const toolkitSlice = createSlice({
  name: "search",
  initialState: {
    text: "",
    history: [],
    focus: false
  },
  reducers: {
    initHistory(state) {
      state.history = JSON.parse(localStorage.getItem("history")) || []
    },
    changeText(state, action) {
      state.text = action.payload
    },
    changeHistory(state, action) {
      const text = action.payload
      const historySet = new Set(state.history)
      historySet.add(text)
      const unduplicatedHistory = [...historySet]
      console.log(unduplicatedHistory)
      localStorage.setItem("history", JSON.stringify(unduplicatedHistory))
      state.history = unduplicatedHistory
    },
    changeFocusOnSearch(state, action) {
      state.focus = action.payload
    }
  }
})

export const {changeText, changeHistory, changeFocusOnSearch, initHistory} = toolkitSlice.actions
export default toolkitSlice.reducer