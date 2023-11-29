import React, { useState } from 'react';
import styles from './ModalChangeinfo.module.css';
import { Cookies } from "react-cookie";
import axios from "axios";

function ModalChangeinfo({ setModalOpen}){
    const cookies = new Cookies();
    const [profilenumber, setProfilenumber] = useState(0);
    const csrftoken = cookies.get("csrftoken");
    
    const closeModal = () => {
        setModalOpen(false);
    };


    const config = {
        headers: {
          "X-CSRFToken": csrftoken,
        },
      };
    const changeProfile = async () => {
        try {
          const response = await axios.put(
            "http://127.0.0.1:8000/accounts/dj-rest-auth/user/",
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
            
            </div>
            <button className={styles.submit} >
                변경
            </button>
        </div>
    );
}

export default ModalChangeinfo;
