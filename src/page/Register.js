import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button.js";
import Input from "../components/Input.js";
import { useState } from "react";
import axios from "axios";
import BGimg from "../images/background.png";
function Register() {
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const emailCheck = (username) => {
    return emailRegEx.test(username); //형식에 맞을 경우, true 리턴
  };
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };
  const onRegister = (e) => {
    e.preventDefault();
    // if (emailCheck(e) === false) {
    //   return alert("이메일형식에 맞춰서 써주세요");
    // }
    // if (!Email || !Name || !Password || !ConfirmPassword) {
    //   return alert("모든 항목을 입력해주세요.");
    // }
    // if (Password !== ConfirmPassword) {
    //   return alert("비밀번호가 일치하지 않습니다.");
    // }
    registerSend();
  };

  const registerSend = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/accounts/dj-rest-auth/registration/",
        {
          email: Email,
          password1: Password,
          password2: ConfirmPassword,
        }
      );

      console.log(response.data); // 성공한 경우 응답 데이터 출력
      confirmEmail();
    } catch (error) {
      // API 호출 중 에러가 발생한 경우
      if (error.response) {
        // 서버가 응답을 반환하지만 2xx 상태 코드가 아닌 경우
        console.error("Error response from server:", error.response.data);
        const getValues = Object.values(error.response.data)
        const arrayString = getValues.join('\n');
        alert(arrayString);
      } 
      else if (error.request) {
        // 서버로의 요청이 전송되지 않은 경우
        console.error(
          "No response received from server. Request might not have been sent."
        );
      } else {
        // 요청을 설정하는 동안 에러가 발생한 경우
        console.error("Error setting up the request:", error.message);
      }
    }
  };

  const confirmEmail = () => {
    if (window.confirm(`${Email}로 가서 이메일 인증을 하세요~`)) {
      navigate("/login");
    }
  };
  return (
    <body>
      <div style={{ position: "absolute" }}>
        <img src={BGimg} alt="background" />
      </div>
      <div className="max-w-[400px] w-[400px] mx-auto bg-transparent p-4 rounded position-relative">
        <form onSubmit={onRegister}>
          <h2 className="text-5xl font-bold text-center text-white py-5 ">
            회원가입
          </h2>
          <div className="flex flex-col py-2">
            <label className="text-white">Email</label>
            <Input
              className="border p-2 rounded"
              type="text"
              value={Email}
              onChange={onEmailHandler}
              placeholder="example@xxx.com"
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
          <div className="flex flex-col py-2">
            <label className="text-white">Password 확인</label>
            <Input
              className="border p-2 rounded"
              type="password"
              value={ConfirmPassword}
              onChange={onConfirmPasswordHandler}
            />
          </div>
          <div className="flex flex-col pt-2">
            <label className="text-white">셋톱박스 번호</label>
            <Input
              className="border p-2 rounded"
              type="text"
              // value={Name}
              // onChange={onNameHandler}
            />
          </div>
          <div className="flex justify-between">
            <Link to="/login">
              <Button label={"아이디가 있음"} />
            </Link>
            <Button label={"회원가입"} />
          </div>
        </form>
      </div>
    </body>
  );
}

export default Register;
