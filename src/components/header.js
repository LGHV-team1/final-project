import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import logo from "../images/logo.png"

const Header = () => {
    const navigate = new useNavigate();
    const correntuser = window.localStorage.getItem("id")
    const userid = window.localStorage.getItem("userid")
    const tmp = 0;

    const goToLoginForm = () => {
        navigate('/login')
    }
    // const goToSignupForm = () => {
    //     navigate('/usersignup')
    // }
    const goToMypage = () => {
        navigate('/mypage')
    }
    // const goToLogout = () => {
    //     window.localStorage.clear()
    //     ApiService.logout()
    //         .then( (res) => {
    //             console.log(res)
    //         }
    //     )
    //     alert("로그아웃 완료")
    //     navigate('/')
    // }
    // const goToArticle = () => {
    //     navigate('articles')
    // }


    
    return (
      <header class="p-3 bg-black text-white">
      <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            <img src={logo} alt="logo" width="70px"/>
            <span class="me-5"></span>
          </a>
  
          <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><a href="/home" class="nav-link px-2 text-secondary fs-5">홈</a></li>
            <li><a href="/" class="nav-link px-2 text-white fs-5">영화</a></li>
            <li><a href="/" class="nav-link px-2 text-white fs-5">TV</a></li>

          </ul>
  
          <form class="col-6 col-sm-2 mb-3 mb-lg-0 me-lg-3 ">
            <input type="search" class="form-control form-control-dark" placeholder="Search..." aria-label="Search"/>
          </form>
          {
            window.localStorage.getItem("token") === null
            ? <div class="text-end">
                <button type="button" class="btn btn-outline-danger" onClick={goToLoginForm}>로그인</button>
              </div>
            : <div class="text-end">
                <button type="button" class="btn btn-outline-danger" onClick={goToMypage}>마이페이지</button>
              </div>
          }

        
        </div>
      </div>
    </header>
    )
    
}

export default Header