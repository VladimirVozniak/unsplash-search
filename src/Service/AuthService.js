import axios from "axios";

class AuthService {
  getAuthHeader() {
    const token = localStorage.getItem("token");
    if (!token) {
      return `Client-ID ${process.env.REACT_APP_OAUTH_CLIENT_ID}`
    }
    return `Bearer ${token}`
  }

  async receiveToken(code) {
    const token = await axios.post(process.env.REACT_APP_TOKEN_URL,
      {
        client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
        client_secret: process.env.REACT_APP_OAUTH_CLIENT_SECRET,
        redirect_uri: process.env.REACT_APP_REDIRECT_URL,
        code: code,
        grant_type: process.env.REACT_APP_GRANT_TYPE
      })
    localStorage.setItem("token", token.data.access_token)
  }

  logout() {
    localStorage.setItem("token", "")
  }
}

export default new AuthService()