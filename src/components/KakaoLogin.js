import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Kakao_Login() {
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
      setAccessTokenFetching(true); // Set fetching to true

      const response = await axios.post(
        "~~~/api/auth/kakao",
        {
          authorizationCode: kakaoCode,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const accessToken = response.data.accessToken;
      console.log("accessToken:", accessToken);

      setAccessToken(accessToken);

      setAccessTokenFetching(false); // Reset fetching to false
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      setAccessTokenFetching(false); // Reset fetching even in case of error
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
