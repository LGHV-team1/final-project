import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
export default function  GoogleLoginButton () {
    const clientId =
      "544256168895-ljim7p29efnn5raai7gr25tbvppbucj7.apps.googleusercontent.com";
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