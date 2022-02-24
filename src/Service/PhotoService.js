import api from "../api/api";
import {AuthService} from "./AuthService";

export default class PhotoService {
  static async likePhoto(id) {
    const photo = await api.post(`/photos/${id}/like`, {}, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
    return photo.data
  }

  static async unLikePhoto(id) {
    const photo = await api.delete(`/photos/${id}/like`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
    return photo.data
  }

  static async searchPhotos(text) {
    const photos = await api.get(`/search/photos?query=${text}`,
      {
        headers: {
          "Authorization": AuthService.getAuthHeader()
        }
      })
    return photos.data.results
  }
}
