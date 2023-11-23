import 'bootstrap/dist/css/bootstrap.css';
import LGHVlogo from "../images/CI_White.png";
const Footer = () => {
    return (
  <footer class="py-3 bg-black position-relative">
    <div class="mx-44 ">
    <ul class="nav justify-content-center border-bottom pb-3 mb-3">
      <li class="nav-item"><a href="/main" class="nav-link px-2 text-white">홈</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-white">영화</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-white">TV</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-white">고객센터</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-white">About</a></li>
    </ul>
    <div>
      <img src={LGHVlogo} alt="hellovisionlogo" width="200px" style={{display:'inline', float:"left"}}/>
      <span class="text-white float-right">&copy; 오볼추</span>
    </div>
        
    </div>
  </footer>
    )
}

export default Footer