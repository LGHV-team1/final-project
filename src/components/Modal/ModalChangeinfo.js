import React, {useEffect, useState} from "react";
import styles from './ModalChangeinfo.module.css';
import { Cookies } from "react-cookie";
import axios from "axios";
import ApiService from "../../api/ApiService.js";
import Button from "../Button.js";

function ModalChangeinfo({ setModalOpen}){
    const cookies = new Cookies();
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [NewStb, setNewStb] = useState(0);
    const closeModal = () => {setModalOpen(false);};
    const csrftoken = cookies.get("csrftoken");
    const [userinfo, setUserinfo] = useState({
        email : '',
        stbnumber : ''
      });

    useEffect(() => {
        ApiService.getUserInfo({ withCredentials: true })
            .then((res)=> {
                setUserinfo(res.data);
                console.log(res.data)
        })
    }, [userinfo.stbnumber]);

    const onSTBHandler = (event) => {
        setNewStb(event.currentTarget.value);
      };
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
      };
    const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
    };
    const config = {
        headers: {
          "X-CSRFToken": csrftoken,
        },
      };
    
    const changeStb = async () => {
        try {
            console.log(NewStb)
          const response = await axios.put(
            "http://127.0.0.1:8000/accounts/dj-rest-auth/user/",
            {
                stbnumber: NewStb
            },
            config
          );
          alert('셋톱박스 번호가 수정되었습니다')
          console.log(response)
          //window.location.href = "/mypage"
        } catch (error) {
            if (error.response) {
                // 서버가 응답을 반환하지만 2xx 상태 코드가 아닌 경우
                console.error("Error response from server:", error.response.data);
                const getValues = Object.values(error.response.data)
                alert(getValues.join('\n'));
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
    }

    const changePassword = async () => {
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/accounts/dj-rest-auth/password/change/",
            {
                new_password1: Password,
                new_password2: ConfirmPassword
            },
            config
          );
          console.log(response);
          alert('비밀번호가 수정되었습니다')
          //window.location.href = "/mypage"
        } catch (error) {
            if (error.response) {
                // 서버가 응답을 반환하지만 2xx 상태 코드가 아닌 경우
                console.error("Error response from server:", error.response.data);
                const getValues = Object.values(error.response.data)
                alert(getValues.join('\n'));
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
    }

    return (
        <div className={styles.container}>
            <button className={styles.close} onClick={closeModal}>
                닫기
            </button>
            <div className="my-11">
            <h2 className="text-center">내 정보 수정</h2>
            </div>
            <div className="inline-block">
                <form className="mb-3 flex items-center ">
                    <label className="mr-5 text-lg">　 이메일 　</label>
                    <input
                        className="border p-2 rounded bg-gray-100"
                        type="email"
                        value={userinfo.email}
                        readOnly
                        />
                </form>
                <form className="mb-3 flex items-center">
                    <label className="mr-2 text-lg">비밀번호 수정</label>
                    <input
                        className="border p-2 rounded"
                        type="password"
                        value={Password}
                        onChange={onPasswordHandler}
                        placeholder="새로운 비밀번호"
                        />
                </form>
                <form className="mb-3 flex items-center">
                    <label className="mr-2 text-lg">비밀번호 확인</label>
                    <input
                        className="border p-2 rounded"
                        type="password"
                        value={ConfirmPassword}
                        onChange={onConfirmPasswordHandler}
                        placeholder="새로운 비밀번호 확인"
                    />
                </form>
                <Button 
                    className={"border mb-5 py-2 w-full bg-my-color  hover:bg-my-color/70 text-white  rounded px-4"} 
                    label={"비밀번호 수정"}
                    onClick={changePassword}/>
                    
                <form className="mb-3 flex items-center">
                    <label className="mr-2 text-lg">셋톱박스 번호</label>
                    <input
                        name = "stbnumber"
                        className="border p-2 rounded"
                        type="text"
                        defaultValue={userinfo.stbnumber}
                        onChange={onSTBHandler}
                        
                    />
                </form>
                <Button 
                    className={"border mb-5 py-2 w-full bg-my-color  hover:bg-my-color/70 text-white  rounded px-4"} 
                    label={"셋톱박스 번호 수정"}
                    onClick={changeStb}/>
            </div>
        </div>
    );
}

export default ModalChangeinfo;
