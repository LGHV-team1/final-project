import "bootstrap/dist/css/bootstrap.css";
import LGHVlogo from "../../images/CI_White.png";
import "./Footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  
  return (
    <div className="footer">
      <div className="footer-container">
        <ul className="footer-list">
          <li className="footer-list-item">
            <Link to={"./main"} style={{ textDecoration: "none" }}>
              홈
            </Link>
          </li>
          <li className="footer-list-item">
            <Link to={"#"}>영화</Link>
          </li>
          <li className="footer-list-item">
            <Link to={"#"}>TV</Link>
          </li>
          <li className="footer-list-item">
            <Link to={"#"}>고객센터</Link>
          </li>
          <li className="footer-list-item">
            <Link to={"#"}>About</Link>
          </li>
        </ul>

        <img src={LGHVlogo} alt="hellovisionlogo" width="200px" />

        <div className="footer-copy">
          <span class="text-white">&copy; 오볼추</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
