import {combineReducers, configureStore} from "@reduxjs/toolkit";
import search from "./search";
import photos from "./photos";

const rootReducer = combineReducers({
  search,
  photos
})

export const store = configureStore({
  reducer: rootReducer
})