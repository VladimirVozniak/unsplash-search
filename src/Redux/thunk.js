import {addPhotos} from "./photos";
import PhotoService from "../Service/PhotoService";

export const allPhoto = (text) => {
  return async dispatch => {
    const photos = await PhotoService.searchPhotos(text)
    dispatch(addPhotos(photos))
  }
}