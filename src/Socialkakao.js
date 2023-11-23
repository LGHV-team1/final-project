import axios from 'axios';
import {React, useEffect } from 'react';
import {Cookies} from 'react-cookie';

function Socialkakao() {
    const cookies = new Cookies();
    const code = cookies.get('code')
    const access_token = cookies.get('access_token')
    const data = {
        "access_token" : access_token,
        "code" : code
    }
    useEffect( ()=> {
        axios.post("http://127.0.0.1:8000/accounts/kakao/login/finish/", data, { withCredentials: true })
        .then( response => {
            console.log(response)
            const token = response.data.key
            cookies.remove('access_token')
            cookies.remove('code')
            localStorage.setItem("jwtToken", token);
            window.location.href = "/main"
        })
    })

    return(
        <div>

        </div>
    )
}
export default Socialkakao