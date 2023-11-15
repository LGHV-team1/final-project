import React from 'react'
import profilepic from "../images/logo.png"
import { useNavigate } from "react-router-dom";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import MiniSlide from '../components/MiniSlide.js';
import styled from "styled-components";

const IconWrap = styled.div`
    svg {
      font-size: 30px;
      margin-right: 10px;
      display : inline-flex;
      align-items: center;
      justify-content: center;
    }
`;

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
    <div className='mb-5'>
      <hr/>
        <IconWrap>
          <div className="text-center m-7">
            <BsBookmarkHeartFill color="#FF66B2"/>
            <span style={{ fontSize:"23px" }}>Wish List</span>
          </div>
        </IconWrap>
        <div className="text-center">
          <MiniSlide/>
        </div>
      </div>

      <div className='mb-5'>
      <hr/>
        <IconWrap>
          <div className="text-center m-7">
            <BsPencilSquare color='#3399FF'/>
            <span style={{ fontSize:"23px" }}>My Review</span>
          </div>
        </IconWrap>
        <div className="text-center">
        </div>
        <hr/>
      </div>
      <div className="max-w-[200px] w-[400px] mx-auto m-7 text-center">
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
