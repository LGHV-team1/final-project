import axios from "axios";
axios.defaults.withCredentials = true; 
class ApiService {
    BASE_URL = "http://loadbalancer-1865644812.ap-northeast-2.elb.amazonaws.com/"
    
    axiosInstance = axios.create({
        baseURL: this.BASE_URL,
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
        }
    });

    getUserInfo(){
        return this.axiosInstance.get(`${this.BASE_URL}accounts/dj-rest-auth/user/`)
    }

    logout(){
        return this.axiosInstance.post(`${this.BASE_URL}accounts/dj-rest-auth/logout/`)
    }

    getMyreview() {
        return this.axiosInstance.get(`${this.BASE_URL}review/myreview`)
    }

    getMywish() {
        return this.axiosInstance.get(`${this.BASE_URL}wishlists/`)
    }
}

export default new ApiService();