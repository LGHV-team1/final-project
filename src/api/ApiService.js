import axios from "axios";

class ApiService {
    BASE_URL = "http://127.0.0.1:8000"
    getUserInfo(){
        return axios.get(`${this.BASE_URL}/accounts/userinfo`)
    }

    logout(){
        return axios.post(`${this.BASE_URL}/accounts/logout`)
    }
}

export default new ApiService();