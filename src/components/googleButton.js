import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
export default function  GoogleLoginButton () {
    const clientId = process.env.REACT_APP_GOOGLE_ID;
    return (
      <>
        <GoogleOAuthProvider clientId={clientId}>
          <GoogleLogin
            onSuccess={(res) => {
              console.log(res);
            }}
            onFailure={(err) => {
              console.log(err);
            }}
          />
        </GoogleOAuthProvider>
      </>
    );
  };