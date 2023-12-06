import React from "react";
import BGimg from "../images/background.png";
import { useNavigate } from "react-router-dom";
import HelloAD from "../components/Helload";
import Button from "../components/Button";
import { useState, useEffect } from "react";
function First() {
  const [blogTitle, setBlogTitle] = useState("");
  const [count, setCount] = useState(0);
  const completionWord = "Hello RVD World";
  const navigate = new useNavigate();
  const goToLoginForm = () => {
    navigate("/login");
  };

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (count === completionWord.length) {
        return;
      }
      setBlogTitle((prevTitleValue) => {
        let result = prevTitleValue
          ? prevTitleValue + completionWord[count]
          : completionWord[0];
        setCount(count + 1);

        return result;
      });
    }, 300);

    return () => {
      clearInterval(typingInterval);
    };
  });

  return (
    <body
      className="bg-black "
      style={{
        backgroundImage: `url(${BGimg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <div style={style}>
        <span
          className="inline animate-typingCursor"
          style={{
            fontWeight: "900",
            fontSize: "72px",
            fontFamily: "Consolas, 'Courier New', monospace",
          }}
        >
          {blogTitle}{" "}
        </span>
        <br></br>
        <h2> 오늘 볼 VOD를 추천해드립니다 </h2>
        <h3> 지금 바로 로그인해서 확인하세요 </h3>
        <br></br>
        <Button
          className="py-2 bg-my-color  text-white  hover:bg-my-color/70 rounded px-4"
          label={"로그인"}
          onClick={goToLoginForm}
        />

      </div>
    </body>
  );
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate( -50%,-15%)",
  color: "white",
  textAlign: "center",
};

export default First;
