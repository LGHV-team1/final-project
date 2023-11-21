import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import MiniSlide from '../components/MiniSlide.js';
import styled from "styled-components";
import ApiService from "../api/ApiService.js";
import profile1 from "../images/profile_boy.png"
import profile2 from "../images/profile_girl.png"
import profile3 from "../images/profile_man.png"
import profile4 from "../images/profile_woman.png"


const IconWrap = styled.div`
    svg {
      font-size: 30px;
      margin-right: 10px;
      display : inline-block;
      align-items: center;
      justify-content: center;
      margin-bottom: 5px;
    }

    p {
      display : inline-block;
      font-size: 25px;
      align-items: center;
    }
`;

export default function Mypage() {
  const navigate = useNavigate();
  let [userinfo, setUserinfo] = useState({
    useremail : '',
    userprofile : ''
  });

  useEffect(() => {
    ApiService.getUserInfo( 
      { withCredentials: true }
    )
    .then((res)=> {
        console.log(res)
        setUserinfo(res.data);
    
    })
  }, []);
  if (userinfo.userprofile === "1") {
    const profilepic = "../images/profile_boy.png"
  }
  else if(userinfo.userprofile === "2"){
    const profilepic = profile2;
  }

  return (
    <div>
      <div className="max-w-[400px] w-[400px] mx-auto bg-white p-4 text-center">
        <img src={profile2} alt="프로필사진" width="50%" className='m-auto'></img>
        <div className="flex flex-col py-8">
          {/* <div>{userinfo.username}님 안녕하세요!</div> */}
          <div>ㅇㅇㅇ님 안녕하세요</div>
          <div>{userinfo.useremail}</div>
        </div>
      </div>
    <div className="max-w-[1000px] w-[1000px] mx-auto text-center"> 
    <div className='mb-5'>
      <hr/>
        <IconWrap>
          <div className="text-center">
            <BsBookmarkHeartFill color="#FF66B2"/>
            <p>위시리스트 </p>
          </div>
        </IconWrap>
        <div className="text-center mt-3">
          <MiniSlide/>
        </div>
      </div>

      <div className='mb-5'>
      <hr/>
        <IconWrap>
          <div className="text-center">
            <BsPencilSquare color='#3399FF'/>
            <p>나의 리뷰 </p>
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
