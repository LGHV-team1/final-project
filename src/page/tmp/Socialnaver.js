import {React, useEffect } from 'react';
import {Cookies} from 'react-cookie';
import BGimg from '../../images/background.png'
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button.js";
import GoogleLoginButton from "../../components/GoogleButton.js";
import KakaoButton from "../../components/KakaoButton.js";
import NaverButton from "../../components/NaverButton.js";
import Input from "../../components/Input.js";

function Socialnaver() {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const loginerror = cookies.get('loginerror')
    const loginjwt = cookies.get("loginjwt")
    const loginrefresh = cookies.get("loginrefresh")
    useEffect( ()=> {
        if (loginerror === "not_social") {
            cookies.remove('loginerror')
            window.location.href = "/login"
            alert("일반회원가입으로 가입된 이메일입니다.");

        }
        else if (loginerror === "not_naver"){
            cookies.remove('loginerror')
            window.location.href = "/login"
            alert("다른 소셜로그인으로 가입된 이메일입니다.");
        }
        else if (loginerror === 'failed to signin'){
            cookies.remove('loginerror')
            window.location.href = "/login"
            alert("로그인 에러 다시 실행해주세요.");
        }
        else
          {
            localStorage.setItem("jwtToken", loginjwt);
            localStorage.setItem("refresh", loginrefresh);
            cookies.remove('loginjwt')
            cookies.remove('loginrefresh')
            navigate("/home");
        }
    })

    return (
      <body
      style={{
        backgroundImage: `url(${BGimg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
        <div className="max-w-[400px] w-[400px] mx-auto bg-transparent p-4 rounded position-relative">
          <form >
            <h2 className="text-5xl font-bold text-center text-white py-5">로그인</h2>
            <div className="flex flex-col py-2">
              <label className="text-white">Email</label>
              <Input
                className="border p-2 rounded"
                type="text"
                placeholder="example@xxx.com"
                
              />
            </div>
            <div className="flex flex-col py-2">
              <label className="text-white">Password</label>
              <Input
                className="border p-2 rounded"
                type="password"
                
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
export default Socialnaver