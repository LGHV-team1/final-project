import axios from "axios";
import { Cookies } from "react-cookie";
class ApiService {
    BASE_URL = "https://server.hellorvdworld.com/";

    axiosInstance = axios.create({
        baseURL: this.BASE_URL,
        withCredentials: true,
        
    });

    isTokenExpired(token) {
        const decodedToken = this.decodeToken(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp < currentTime;
    }

    decodeToken(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(window.atob(base64));
    }

    constructor() {
        this.cookies = new Cookies();
        this.initializeRequestInterceptor();
    }

    initializeRequestInterceptor() {
        this.axiosInstance.interceptors.request.use(
            async config => {
                let token = localStorage.getItem('jwtToken');
                const csrftoken = this.cookies.get("csrftoken");
                config.headers['X-CSRFToken'] = csrftoken;
                if (token && this.isTokenExpired(token)) {
                    const refreshToken = localStorage.getItem('refresh');
                    if (refreshToken) {
                        try {
                            const response = await axios.post(`${this.BASE_URL}accounts/dj-rest-auth/token/refresh/`, { refresh: refreshToken });
                            token = response.data.access;
                            console.log(response)
                            localStorage.setItem('jwtToken', token);
                            config.headers['Authorization'] = `Bearer ${token}`;
                        } catch (error) {
                            console.error('Error refreshing token:', error);
                            // 여기에 토큰 갱신 실패 시 처리 로직을 추가할 수 있습니다.
                        }
                    }
                } else {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            error => Promise.reject(error)
        );
    }

    logout(refreshtoken) {
        return this.axiosInstance.post('accounts/dj-rest-auth/logout/',{
            refresh : refreshtoken
        } );
    }

    login(email, password) {
        return this.axiosInstance.post('accounts/dj-rest-auth/login/', {
            email: email,
            password: password
        });
    }
    getPrefer(prefer){
        return this.axiosInstance.get(`/contents/Firstuser/${prefer}`);
    }
    getUserInfo() {
        return this.axiosInstance.get('accounts/dj-rest-auth/user/');
    }
    getVodDetail(name){
        return this.axiosInstance.get(`contents/${name}/detail/`);
    }

    getVodReview(name){
        return this.axiosInstance.get(`contents/${name}/review/`);
    }

    getMyreview() {
        return this.axiosInstance.get('review/myreview');
    }

    getMywish() {
        return this.axiosInstance.get('wishlists/');
    }

    getRec(algorithmNum) {
        return this.axiosInstance.get(`recommend/${algorithmNum}`);
    }
    getCategory(category) {
        return this.axiosInstance.get(`contents/pick/${category}`);
    }
    getKids1(){
        return this.axiosInstance.get('contents/category/kids/');
    }
    getKids2(category){
        return this.axiosInstance.get(`contents/category/kids/${category}`);
    }
    getMovie1(){
        return this.axiosInstance.get('contents/category/movie/');
    }
    getMovie2(category){
        return this.axiosInstance.get(`contents/category/movie/${category}`);
    }
    getTv1(){
        return this.axiosInstance.get('contents/category/tv/');
    }
    getTv2(category){
        return this.axiosInstance.get(`contents/category/tv/${category}`);
    }

    getSearch1(searchword){
        return this.axiosInstance.get(`contents/search/${searchword}`);
    }
    getSearch2(searchword){
        return this.axiosInstance.get(`contents/${searchword}`);
    }
    getSearch3(searchword){
        return this.axiosInstance.get(`contents/search/actor/${searchword}`);
    }

    postReview(name, review, rankValue){
        return this.axiosInstance.post(`contents/${name}/review/`, {
            payload: review,
            rating: rankValue,
        });
    }
    postWish(name, wish){
        return this.axiosInstance.post(`contents/${name}/detail/`,
        {
            wish: wish,
        }
        );

    }
    changeSTB(newSTB) {
        return this.axiosInstance.put('accounts/dj-rest-auth/user/', {
            stbnumber: newSTB
        });
    }

    changePPic(profilenum) {
        return this.axiosInstance.put('accounts/dj-rest-auth/user/', {
            user_profile: profilenum
        });
    }
    changePrefer(prefer) {
        return this.axiosInstance.put('accounts/dj-rest-auth/user/', {
            prefer_contents: prefer
        });
    }
    changePW(pw1, pw2){
        return this.axiosInstance.post('accounts/dj-rest-auth/password/change/', {
            new_password1: pw1,
            new_password2: pw2
        });
    }

    changeReview(id, newpayload, newrating){
        return this.axiosInstance.put(`review/myreview/${id}`, {
            payload : newpayload,
            rating: newrating
        });
    }

    deleteReview(id){
        return this.axiosInstance.delete(`review/myreview/${id}`, {});
    }
    
    deleteUser(){
        return this.axiosInstance.delete(`accounts/deleteuser/`, {});
    }
}

export default new ApiService();