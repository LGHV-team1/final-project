import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Kakao_Login() {
  const Rest_api_key = process.env.REACT_APP_KAKAO_KEY; //REST API KEY
  const redirect_uri = process.env.REACT_APP_KAKAO_REDIRECT; //Redirect URI
  const PARAMS = new URL(document.location).searchParams;
  const kakaoCode = PARAMS.get("code");
  const [accessToken, setAccessToken] = useState(null);
  const [accessTokenFetching, setAccessTokenFetching] = useState(false);
  const navigate = useNavigate();

  console.log(kakaoCode);
  // Access Token 받아오기
  const getAccessToken = async () => {
    if (accessTokenFetching) return; // Return early if fetching

    console.log("getAccessToken 호출");

    try {
      //setAccessTokenFetching(true); // Set fetching to true

      const response = await axios({
        method: 'POST',
        url: "https://kauth.kakao.com/oauth/token",
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        data: {
          "grant_type" : "authorization_code",
          "client_id" : Rest_api_key,
          "redirect_uri": redirect_uri,
          "code": kakaoCode
        }
    }).then((res) => {
      console.log(res.data)
      const accessToken = res.data.access_token;
      console.log(accessToken)
      //setAccessToken(accessToken);
      //setAccessTokenFetching(false); // Reset fetching to false
      //navigate("/");
    }).catch();
    } catch (error) {
      console.error("Error:", error);
      //setAccessTokenFetching(false); // Reset fetching even in case of error
    }
  };

  useEffect(() => {
    if (kakaoCode && !accessToken) {
      getAccessToken();
    }
  }, [kakaoCode, accessToken]);  
  return (
    <div>
        loading
    </div>
   
  );
}
