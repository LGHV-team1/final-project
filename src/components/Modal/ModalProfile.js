import React, { useState } from 'react';
import styles from './ModalProfile.module.css';
import profile1 from "../../images/profileimg/profile_boy.png"
import profile2 from "../../images/profileimg/profile_girl.png"
import profile3 from "../../images/profileimg/profile_man.png"
import profile4 from "../../images/profileimg/profile_woman.png"
import { Cookies } from "react-cookie";
import axios from "axios";
import Button from '../Button';
import ApiService from '../../api/ApiService';
function ModalProfile({ setModalOpen}){
    const { BASE_URL: URL } = ApiService;
    const cookies = new Cookies();
    const [selectedImage, setSelectedImage] = useState(null);
    const [profilenumber, setProfilenumber] = useState(0);
    const csrftoken = cookies.get("csrftoken");
    
    const closeModal = () => {
        setModalOpen(false);
    };

    const selectImage = (image) => {
        setSelectedImage(image);
    };

    const getImageClass = (image) => {
        return selectedImage === image ? "hover:brightness-100 brightness-100" : "hover:brightness-100 brightness-50";
    };

    const handleImageClick = (image, profileNumber) => {
        selectImage(image);
        setProfilenumber(profileNumber);
    };
    const config = {
        headers: {
          "X-CSRFToken": csrftoken,
          'Authorization': `Token ${localStorage.getItem('jwtToken')}`,
        },
      };
    const changeProfile = async () => {
        try {
          const response = await axios.put(
            `${URL}accounts/dj-rest-auth/user/`,
            {
                user_profile: profilenumber
            },
            config
          );
          setModalOpen(false);
          window.location.href = "/mypage"
        } catch (error) {
            console.log(error.data);
        }
    }

    return (
        <div className={styles.container}>
            <button className={styles.close} onClick={closeModal}>
                닫기
            </button>
            <div className="mt-11">
                <button onClick={() => handleImageClick(profile1, 0)} className={getImageClass(profile1)}>
                    <img src={profile1} alt="프로필사진" width="150px" />
                </button>
                <button onClick={() => handleImageClick(profile2, 1)} className={getImageClass(profile2)}>
                    <img src={profile2} alt="프로필사진" width="150px" />
                </button>
                <button onClick={() => handleImageClick(profile3, 2)} className={getImageClass(profile3)}>
                    <img src={profile3} alt="프로필사진" width="150px" />
                </button>
                <button onClick={() => handleImageClick(profile4, 3)} className={getImageClass(profile4)}>
                    <img src={profile4} alt="프로필사진" width="150px" />
                </button>
            </div>
            <Button 
                    className={"border mt-3 py-2 w-[45%] bg-my-color  hover:bg-my-color/70 text-white  rounded px-4"} 
                    label={"프로필 사진 변경"}
                    onClick={changeProfile}/>
        </div>
    );
}

export default ModalProfile;
