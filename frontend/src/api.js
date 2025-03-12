import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:8000/",
    withCredentials: true,
})

async function updateAccessToken() {
    try {
        const res = await api.get("/api/user/refresh_token/")
        return true
    }
    catch (err) {
        console.error("Failed to refresh access token: ", err)
        return false
    } 
}

export default api