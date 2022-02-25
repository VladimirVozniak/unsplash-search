import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import photoService from "../Service/PhotoService";
import {setLoading} from "./shared";

const toolkitSlice = createSlice({
  name: "photos",
  initialState: {
    photosList: []
  },
  reducers: {
    addPhotos(state, action) {
      state.photosList = action.payload
    },
    updatePhoto(state, action) {
      const newPhoto = action.payload
      state.photosList = state.photosList.map(photo => {
        if (photo.id === newPhoto.id) return newPhoto
        return photo
      })
    }
  }
})

export const {addPhotos, updatePhoto} = toolkitSlice.actions

export const searchPhotos = createAsyncThunk('photos/searchPhotos', async (text, {dispatch}) => {
  dispatch(setLoading(true))
  const photos = await photoService.searchPhotos(text)
  dispatch(addPhotos(photos))
  dispatch(setLoading(false))
})

export const likePhoto = createAsyncThunk('photos/likePhoto', async ({id, isLiked}, {dispatch}) => {
  dispatch(setLoading(true))
  const response = isLiked? await photoService.unLikePhoto(id): await photoService.likePhoto(id)
  dispatch(updatePhoto(response.photo))
  dispatch(setLoading(false))
})

export default toolkitSlice.reducer
