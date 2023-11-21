import axios from "axios";
axios.defaults.withCredentials = true; 
class ApiService {
    BASE_URL = "http://127.0.0.1:8000"
        
    getUserInfo(){
        return axios.get(`${this.BASE_URL}/accounts/currentuser`)
    }

    logout(){
        return axios.post(`${this.BASE_URL}/accounts/dj-rest-auth/logout/`)
    }
}

export default new ApiService();