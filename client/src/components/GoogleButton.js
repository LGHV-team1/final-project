import google_btn from "../images/google.png";

function GoogleButton() {
  const Rest_api_key = process.env.REACT_APP_GOOGLE_ID; //REST API KEY
  const redirect_uri = process.env.REACT_APP_GOOGLE_REDIRECT; //Redirect URI
  const scope = "https://www.googleapis.com/auth/userinfo.email";
  // oauth 요청 URL
  const googleURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=code`;
  const handleLogin = () => {
    window.location.href = googleURL;
  };
  return (
    <button onClick={handleLogin}>
      <img
        src={google_btn}
        alt="구글 로그인 버튼"
        className="rounded-md"
        width="50px"
      />
    </button>
  );
}

export default GoogleButton;
