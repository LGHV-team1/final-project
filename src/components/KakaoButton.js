import kakao_btn from "../images/kakao.png"

const KakaoButton = () => {
    const Rest_api_key = process.env.REACT_APP_KAKAO_KEY; //REST API KEY
    const redirect_uri = process.env.REACT_APP_KAKAO_REDIRECT; //Redirect URI
    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
    
    const handleLogin = () => {
      window.location.href = kakaoURL;
    };
    return (
      <button onClick={handleLogin}>
        <img
          src={kakao_btn}
          alt="카카오 로그인 버튼"
          width="50px"
        />
      </button>
      
    );
  };

export default KakaoButton;