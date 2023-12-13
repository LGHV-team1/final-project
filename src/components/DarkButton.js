import React,{useEffect, useState} from "react";

export default function DarkButton() {
  const [dark, setDark] = useState("다크모드"); // 다크모드 있는곳 텍스트 !

  const toggleDarkMode = () => {
    if (localStorage.getItem("theme") === "dark") {
      // 다크모드 -> 기본모드
      localStorage.removeItem("theme"); // 다크모드 삭제
      document.documentElement.classList.remove("dark"); // html class에서 dark클래스 삭제 !
      setDark("기본모드");
    } else {
      // 기본모드 -> 다크모드
      document.documentElement.classList.add("dark"); // html의 class에 dark 클래스 추가 !
      localStorage.setItem("theme", "dark"); // localstorage에 dark를 추가해서 ! useEffect에서 처음에 검사해서 다크모드인지 판단해주려고 !
      setDark("다크모드");
    }
  };

  useEffect(() => {
    // 처음에 다크모드인지 판단해서 뿌려주기 !! ( 나중에는 상태관리를 해도 괜찮습니다 ! )
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);
  return (
    
      <button onClick={toggleDarkMode} className="text-white ml-2 px-2 rounded-m border border-white">
        {dark ==="다크모드" ? "현재 Dark모드" : "현재 light모드"}
      </button>

  );
}
