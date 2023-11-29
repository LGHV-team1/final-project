import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button.js";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import MiniSlide from '../components/MiniSlide.js';
import MyReview from "../components/MyReview.js"
import styled from "styled-components";
import ApiService from "../api/ApiService.js";
import profile1 from "../images/profile_boy.png"
import profile2 from "../images/profile_girl.png"
import profile3 from "../images/profile_man.png"
import profile4 from "../images/profile_woman.png"
import ModalProfile from "../components/Modal/ModalProfile.js";
import ModalChangeinfo from "../components/Modal/ModalChangeinfo.js";
import { Cookies } from "react-cookie";
import axios from "axios";
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
  const cookies = new Cookies();
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [profilepic, setProfilepic] = useState(profile1);
  const csrftoken = cookies.get("csrftoken");
  const showModal1 = () => {
    setModal1Open(true);
  };
  const showModal2 = () => {
    setModal2Open(true);
  };
  let [userinfo, setUserinfo] = useState({
    email : '',
    username : '',
    user_profile : ''
  });

  useEffect(() => {
    ApiService.getUserInfo( 
      { withCredentials: true }
    )
    .then((res)=> {
      setUserinfo(res.data);
      switch (userinfo.user_profile) {
        case 1:
          setProfilepic(profile2);
          break;
        case 2:
          setProfilepic(profile3);
          break;
        case 3:
          setProfilepic(profile4);
          break;
        default:
          setProfilepic(profile1);
      }
    })
  }, [userinfo.user_profile]);

  const config = {
    headers: {
      "X-CSRFToken": csrftoken,
    },
  };
  const goToLogout = () => {
    axios
      .post("http://127.0.0.1:8000/accounts/dj-rest-auth/logout/", {}, config)
      .then((response) => {
        localStorage.removeItem("jwtToken");
        alert("로그아웃 되었습니다.");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="max-w-[400px] w-[400px] mx-auto bg-white p-4 text-center ">
        <img src={profilepic} alt="프로필사진" width="50%" className='m-auto'></img>
        <div className="flex flex-col py-8">
          <div>{userinfo.email} 님 안녕하세요</div>
        </div>
          <Button
            label={"프로필 사진 변경"}
            onClick={showModal1}
            className={"border rounded p-1 hover:bg-transparent text-black"}
          />{modal1Open && <ModalProfile setModalOpen={setModal1Open} />}
      </div>
      <div className="max-w-[1000px] w-[1000px] mx-auto text-center my-10"> 
        <div className='mb-20'>
          <hr style={{ height: '3px', backgroundColor: '#000', marginBottom:"3%"}}></hr>
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

        <div className='mb-20'>
          <hr style={{ height: '3px', backgroundColor: '#000', marginBottom:"3%"}}></hr>
            <IconWrap>
              <div className="text-center">
                <BsPencilSquare color='#3399FF'/>
                <p>나의 리뷰 </p>
              </div>
            </IconWrap>
            <div className="text-center">
              <MyReview/>
            </div>
          <hr/>
        </div>
        <div className="max-w-[200px] w-[400px] mx-auto m-7 text-center">
        <Button
            label={"회원정보 수정"}
            onClick={showModal2}
            className={"border mt-2 py-2 w-full bg-my-color  hover:bg-my-color/70 text-white  rounded px-4"}
          />{modal2Open && <ModalChangeinfo setModalOpen={setModal2Open} />}

          <Button
            className={
              "border mt-2 py-2 w-full bg-my-color  hover:bg-my-color/70 text-white  rounded px-4"
            }
            label={"로그아웃"}
            onClick={goToLogout}
          />
          <Button
            className={
              "border mt-2 py-2 w-full bg-my-color  hover:bg-my-color/70 text-white  rounded px-4"
            }
            label={"회원 탈퇴"}
          />
        </div>
        </div>
    </div>
  )
}
