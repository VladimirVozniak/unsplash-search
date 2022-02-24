import {combineReducers, configureStore} from "@reduxjs/toolkit";
import search from "./search";
import photos from "./photos";
import shared from "./shared"

const rootReducer = combineReducers({
  search,
  photos,
  shared
})

export const store = configureStore({
  reducer: rootReducer
})