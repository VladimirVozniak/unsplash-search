import {createSlice} from "@reduxjs/toolkit";

const toolkitSlice = createSlice({
  name: "photos",
  initialState: {
    photosList: []
  },
  reducers: {
    addPhotos(state,action){
      state.photosList= action.payload
    }
  }
})

export const {addPhotos} = toolkitSlice.actions
export default toolkitSlice.reducer