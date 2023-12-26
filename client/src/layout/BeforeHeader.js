import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import logo from "../images/seasonlogo.png";
export default function BeforeHeader() {
    const [isScroll, setIsScroll] = useState(false)
    const navigate = useNavigate()
    const goToLoginForm = () => {
        navigate("/login")
    } 
    const goToSignupForm = () => {
        navigate("/register")
    }
    useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 100) {
				setIsScroll(true);
			} else {
				setIsScroll(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);
  return (
    <nav className={`
    sticky top-0 z-10 bg-black py-2
    ${isScroll ? "saturate-100 backdrop-blur-lg" : ""}`}>
    <div className=' mx-28  flex items-center justify-between'>
        <a href="/">
          <img  src={logo} alt="logo" width="110px" />
        </a>
          <div>
            <Button
              className=" mr-5 cursor-pointer text-gray-400 hover:text-my-color"
              onClick={goToLoginForm}
              label={"로그인"}  
            />
            <Button 
              onClick={goToSignupForm}
              label={"회원가입"}
            />
          </div>
          </div>
  </nav>

  )
}
