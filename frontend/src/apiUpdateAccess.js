import api from "./api";


async function updateAccessToken() {
    try {
        const res = await api.post("/api/user/refresh_token/")
        sessionStorage.setItem("access_token_expiration", res.data.expiration)
        return true
    }
    catch (err) {
        console.error("Failed to refresh access token: ", err)
        return false
    } 
  }

export default updateAccessToken
