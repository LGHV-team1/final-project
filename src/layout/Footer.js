import 'bootstrap/dist/css/bootstrap.css';
import LGHVlogo from "../images/CI_White.png";
import RAPA from "../images/rapalogo.png"
import Cable from "../images/cable.png"
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
  <footer class="py-3 mt-auto position-relative h-[100px] border-t border-gray-600">
    <div class="mx-28 ">
  
    <div className='flex justify-between'>
      <div className='flex gap-5'>
      <img src={LGHVlogo} alt="hellovisionlogo" width="200px" style={{display:'inline', float:"left", marginTop:"5px"}}/>
      <img src={RAPA} alt="rapalogo" width="200px" style={{display:'inline', float:"left", marginLeft:"20px", marginTop:"2px"}}/>
      <img src={Cable} alt="rapalogo" width="120px" style={{display:'inline', float:"left", marginLeft:"20px"}}/>
      </div>
      <div >
      <Link className="nav-item no-underline text-gray-400 pr-10 hover:text-my-color" to="/about" >&copy;Rec=Vod</Link>

      </div>
    </div>
        
    </div>

  </footer>
    )
}

export default Footer