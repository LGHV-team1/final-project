import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button.js";
import GoogleLoginButton from "../components/GoogleButton.js";
import { useEffect, useState } from "react";
import KakaoButton from "../components/KakaoButton.js";
import NaverButton from "../components/NaverButton.js";
import Input from "../components/Input.js";
import axios from "axios";
import BGimg from "../images/background.png";

function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onLogin = (e) => {
    e.preventDefault();
    login();
  };

  const login = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/accounts/dj-rest-auth/login/",
        {
          email: Email,
          password: Password,
        },
        { withCredentials: true }
      );
      const token = response.data.key;
      console.log('로그인 성공:', response);
      console.log(token);
      localStorage.setItem("jwtToken", token);
      navigate("/main");
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  return (
    <body>
      <div style={{position:"absolute"}} >
      <img  src={BGimg}alt="background"/>
      </div>
      <div className="max-w-[400px] w-[400px] mx-auto bg-transparent p-4 rounded position-relative">
        <form onSubmit={onLogin}>
          <h2 className="text-5xl font-bold text-center text-white py-5">로그인</h2>
          <div className="flex flex-col py-2">
            <label className="text-white">Email</label>
            <Input
              className="border p-2 rounded"
              type="text"
              placeholder="example@xxx.com"
              value={Email}
              onChange={onEmailHandler}
            />
          </div>
          <div className="flex flex-col py-2">
            <label className="text-white">Password</label>
            <Input
              className="border p-2 rounded"
              type="password"
              value={Password}
              onChange={onPasswordHandler}
            />
          </div>
          <Button
            label={"로그인"}
            className={
              "w-full my-4 py-2 bg-my-color text-white hover:bg-my-color/70 rounded "
            }
          />
          <div className="flex justify-between mb-5">
            <Button
              label={"비밀번호 찾기"}
              className={"bg-transparent hover:bg-transparent text-white"}
            />
            <Link to={`/register`}>
              <Button
                label={"아이디 만들기"}
                className={"bg-transparent hover:bg-transparent text-white"}
              />
            </Link>
          </div>
        </form>
        <div className="flex justify-around">
          <KakaoButton />
          <GoogleLoginButton />
          <NaverButton />
        </div>
      </div>
    </body>
  );
}

export default Login;
