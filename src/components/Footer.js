import 'bootstrap/dist/css/bootstrap.css';
import LGHVlogo from "../images/CI_White.png";
import RAPA from "../images/rapalogo.png"
import Cable from "../images/cable.png"
const Footer = () => {
    return (
  <footer class="py-3 bg-black mt-auto position-relative h-[150px]">
    <div class="mx-44 ">
    <ul class="nav justify-content-center border-bottom pb-3 mb-3">
      <li class="nav-item"><a href="/home" class="nav-link px-2 text-white">홈</a></li>
      <li class="nav-item"><a href="/movie" class="nav-link px-2 text-white">영화</a></li>
      <li class="nav-item"><a href="/tv" class="nav-link px-2 text-white">TV</a></li>
      <li class="nav-item"><a href="/kids" class="nav-link px-2 text-white">키즈</a></li>
      <li class="nav-item"><a href="/about" class="nav-link px-2 text-white">About</a></li>
    </ul>
    <div>
      <img src={LGHVlogo} alt="hellovisionlogo" width="200px" style={{display:'inline', float:"left", marginTop:"5px"}}/>
      <img src={RAPA} alt="rapalogo" width="200px" style={{display:'inline', float:"left", marginLeft:"20px", marginTop:"2px"}}/>
      <img src={Cable} alt="rapalogo" width="120px" style={{display:'inline', float:"left", marginLeft:"20px"}}/>
      <span class="text-white float-right">&copy; Rec=Vod</span>
    </div>
        
    </div>
  </footer>
    )
}

export default Footer