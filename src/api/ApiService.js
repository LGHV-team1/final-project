import axios from "axios";
axios.defaults.withCredentials = true; 
class ApiService {
    BASE_URL = "http://loadbalancer-1038287892.ap-northeast-2.elb.amazonaws.com/"
        
    getUserInfo(){
        return axios.get(`${this.BASE_URL}/accounts/dj-rest-auth/user/`)
    }

    logout(){
        return axios.post(`${this.BASE_URL}/accounts/dj-rest-auth/logout/`)
    }

    getMyreview() {
        return axios.get(`${this.BASE_URL}/review/myreview`)
    }

    getMywish() {
        return axios.get(`${this.BASE_URL}/wishlists/`)
    }
}

export default new ApiService();