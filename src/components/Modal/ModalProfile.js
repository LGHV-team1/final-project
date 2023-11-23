import React, { useState } from 'react';
import styles from './ModalProfile.module.css';
import profile1 from "../../images/profile_boy.png"
import profile2 from "../../images/profile_girl.png"
import profile3 from "../../images/profile_man.png"
import profile4 from "../../images/profile_woman.png"
function ModalProfile({ setModalOpen}){
    const [selectedImage, setSelectedImage] = useState(null);

    const closeModal = () => {
        setModalOpen(false);
    };

    const selectImage = (image) => {
        setSelectedImage(image);
    };

    const getImageClass = (image) => {
        return selectedImage === image ? "hover:brightness-100 brightness-100" : "hover:brightness-100 brightness-50";
    };

    return (
        <div className={styles.container}>
            <button className={styles.close} onClick={closeModal}>
                닫기
            </button>
            <div className="mt-11">
                <button onClick={() => selectImage(profile1)} className={getImageClass(profile1)}>
                    <img src={profile1} alt="프로필사진" width="150px" />
                </button>
                <button onClick={() => selectImage(profile2)} className={getImageClass(profile2)}>
                    <img src={profile2} alt="프로필사진" width="150px" />
                </button>
                <button onClick={() => selectImage(profile3)} className={getImageClass(profile3)}>
                    <img src={profile3} alt="프로필사진" width="150px" />
                </button>
                <button onClick={() => selectImage(profile4)} className={getImageClass(profile4)}>
                    <img src={profile4} alt="프로필사진" width="150px" />
                </button>
            </div>
            <button className={styles.submit} onClick={closeModal}>
                변경
            </button>
        </div>
    );
}

export default ModalProfile;
