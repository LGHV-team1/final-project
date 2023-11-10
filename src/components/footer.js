import 'bootstrap/dist/css/bootstrap.css';
import LGHVlogo from "../images/CI_White.png";
const Footer = () => {
    return (
  <footer class="py-3 mt-4 bg-black mt-auto position-relative">
    <div class="container">
    <ul class="nav justify-content-center border-bottom pb-3 mb-3">
      <li class="nav-item"><a href="/main" class="nav-link px-2 text-white">홈</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-white">영화</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-white">TV</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-white">고객센터</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-white">About</a></li>
    </ul>

        <img src={LGHVlogo} alt="hellovisionlogo" width="200px"/>
    
    <div class="text-end">
        <span class="text-white">&copy; 오볼추</span>
          </div>
        
    </div>
  </footer>
    )
}

export default Footer