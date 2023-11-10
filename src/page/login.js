import { Link, useNavigate } from "react-router-dom";
import Button from "../components/button.js";
import GoogleLoginButton from "../components/googleButton.js";
import { useEffect, useState } from "react";
import KakaoButton from "../components/kakaoButton.js";
import NaverButton from "../components/NaverButton.js";
import Input from "../components/input.js";
import axios from "axios";
import BGimg from '../images/background.png';
import logo from "../images/lg.jpg";

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
        "http://localhost:8000/accounts/dj-rest-auth/login/",
        {
          email: Email,
          password: Password,
        }
      );
      const token = response.data.key;
      console.log(token);
      localStorage.setItem("jwtToken", token);
      navigate("/home");
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  return (
    <div className="max-w-[400px] w-[400px] mx-auto bg-white p-4">
      <form onSubmit={onLogin}>
        <img className="pb-4 " src={logo} alt="Logo" />
        <div className="flex flex-col py-2">
          <label>Email</label>
          <Input
            className="border p-2"
            type="text"
            placeholder="example@xxx.com"
            value={Email}
            onChange={onEmailHandler}
          />
        </div>
        <div className="flex flex-col py-2">
          <label>Password</label>
          <Input
            className="border p-2"
            type="password"
            value={Password}
            onChange={onPasswordHandler}
          />
        </div>
        <Button
          label={"로그인"}
          className={
            "border w-full my-3 py-2 bg-my-color hover:bg-my-color text-white rounded"
          }
        />
        <div className="flex justify-between pb-2 ">
          <Button
            label={"로그인"}
            className={
              "border w-full my-3 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded"
            }
          />
          <div className="flex justify-between mb-5">
            <Button
              label={"비밀번호 찾기"}
              className={"bg-transparent hover:bg-transparent"}
            />
            <Link to={`/register`}>
              <Button
                label={"아이디 만들기"}
                className={"bg-transparent hover:bg-transparent"}
              />
            </Link>
          </div>
        </div>
      </form>
      <div className="text-center">
        <KakaoButton />
        <GoogleLoginButton />
        <NaverButton />
      </div>
      <div className="flex justify-around">
        <div><KakaoButton /></div>
        <div><GoogleLoginButton /></div>
        <div><NaverButton /></div>
      </div>
    </div>
  );
}

export default Login;
