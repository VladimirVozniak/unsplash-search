import api from "../API/api";
import authService from "./AuthService";

class PhotoService {
  async likePhoto(id) {
    const photo = await api.post(`/photos/${id}/like`, {}, {
      headers: {
        "Authorization": authService.getAuthHeader()
      }
    })
    return photo.data
  }

  async unLikePhoto(id) {
    const photo = await api.delete(`/photos/${id}/like`, {
      headers: {
        "Authorization": authService.getAuthHeader()
      }
    })
    return photo.data
  }

  async searchPhotos(text) {
    const photos = await api.get(`/search/photos?query=${text}`,
      {
        headers: {
          "Authorization": authService.getAuthHeader()
        }
      })
    return photos.data.results
  }
}

export default new PhotoService()