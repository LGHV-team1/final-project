import React from 'react'
import profilepic from "../images/logo.png"
import Button from "../components/button.js";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
export default function Mypage() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="max-w-[400px] w-[400px] mx-auto bg-white p-4 text-center">
        <img src={profilepic} alt="프로필사진" width="50%" className='m-auto'></img>
        <div className="flex flex-col py-8">
          <div>ㅇㅇㅇ님</div>
          <div>이메일@이메일.com</div>
        </div>
      </div>
    <div className="max-w-[1000px] w-[1000px] mx-auto text-center"> 
        <div className="text-lg flex pb-2 text-center">
          <FaHeart size="30" color='#a50034' className='float-left'/>    Wish List
        </div>

      <div className="max-w-[200px] w-[400px] mx-auto text-center">
        <button
          className={
            "border mt-2 py-2 w-full bg-pink-700 hover:bg-pink-900  text-white rounded"
          }
        >회원정보 수정</button>
        <button
          className={
            "border mt-2 py-2 w-full bg-pink-700 hover:bg-pink-900 text-white rounded"
          }
        >로그아웃</button>
        <button
          className={
            "border mt-2 py-2 w-full bg-pink-700 hover:bg-pink-900 text-white rounded"
          }
        >회원 탈퇴</button>
      </div>
      </div>
    </div>
  )
}
