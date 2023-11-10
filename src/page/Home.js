import React from 'react'
import BGimg from '../images/background.png'
import {useNavigate} from "react-router-dom";
import HelloAD from "../components/helload"

function Home() {
    const navigate = new useNavigate();
    const goToLoginForm = () => {
        navigate('/login')
    }
    return (
      <body style={{backgroundSize: 'cover',backgroundRepeat: 'no-repeat', backgroundColor:'black'}}>
        <img src={BGimg} alt="background"/>
            <div style={style}> 
                <h1 style={{fontWeight:"900", fontSize:"72px"}}> 안녕하세요! </h1> 
                <br></br>
                <h2> 오늘 볼 VOD를 추천해드립니다 </h2>
                <h3> 지금 바로 로그인해서 확인하세요 </h3>
                <br></br>
                <div style={{marginTop:"50px"}}>
                <button type="button" class="btn btn-danger" onClick={goToLoginForm}>로그인</button>
              </div>
              <div>
                {/*<HelloAD/>*/}
              </div>
          </div>
      </body>
  
    )
}
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate( -50%,-15%)",
    color:"white",
    textAlign:"center",

}


export default Home