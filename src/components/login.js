import { Link, useNavigate } from "react-router-dom";
import Button from "./button";
import GoogleLoginButton from "./googleButton.js";
import { useEffect } from "react";
import SocialKakao from "./kakaoButton";

function Login() {
  return (
    <div className="max-w-[400px] w-[400px] mx-auto bg-white p-4 border-2  border-black mt-4 rounded">
      <form>
        <h2 className="text-5xl font-bold text-center py-5">~오볼추~</h2>
        <div className="flex flex-col py-2">
          <label>Email</label>
          <input
            className="border p-2"
            type="text"
            placeholder="example@xxx.com"
          />
        </div>
        <div className="flex flex-col py-2">
          <label>Password</label>
          <input className="border p-2" type="password" />
        </div>
        <Button
          label={"로그인"}
          className={
            "border w-full my-5 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded"
          }
        />
        <div className="flex justify-between ">
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
      </form>
      <SocialKakao />
      <GoogleLoginButton />
    </div>
  );
}

export default Login;
