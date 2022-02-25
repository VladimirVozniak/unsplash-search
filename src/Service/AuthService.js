export class AuthService {
  static getAuthHeader() {
    const token = localStorage.getItem("token");
    if (!token) {
      return `Client-ID ${process.env.REACT_APP_OAUTH_CLIENT_ID}`
    }
    return `Bearer ${token}`
  }
}