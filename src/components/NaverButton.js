import naver_btn from "../images/btnG_아이콘사각.png"

const NaverButton = () => {
    const Rest_api_key = process.env.REACT_APP_NAVER_ID; //REST API KEY
    const redirect_uri = process.env.REACT_APP_NAVER_REDIRECT; //Redirect URI
    const state = Math.random()
    // oauth 요청 URL
    const naverURL = `https://nid.naver.com/oauth2.0/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&state=${state}&response_type=code`;
    const handleLogin = () => {
      window.location.href = naverURL;
      
    };
    return (
      <button onClick={handleLogin}>
        <img
          src={naver_btn}
          alt="네이버 로그인 버튼"
          className="flex justify-center py-2"
          width="50px"
        />
      </button>
      
    );
  };

export default NaverButton;