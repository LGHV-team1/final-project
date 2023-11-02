const SocialKakao = () => {
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
          src="https://developers.kakao.com/tool/resource/static/img/button/login/full/ko/kakao_login_medium_wide.png"
          alt="카카오 로그인 버튼"
          className="flex justify-center w-full py-2"
          width="300px"
        />
      </button>
      
    );
  };

export default SocialKakao;