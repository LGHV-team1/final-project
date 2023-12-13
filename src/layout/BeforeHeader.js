import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import logo from "../images/tmplogo.png";
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
    sticky top-0 z-10 bg-black py-1
    ${isScroll ? "saturate-100 backdrop-blur-lg" : ""}`}>
    <div className=' mx-44  flex items-center justify-between'>
        <a href="/">
          <img  src={logo} alt="logo" width="200px" />
        </a>
          <div>
            <Button
              className=" mr-5 cursor-pointer text-gray-400 "
              onClick={goToLoginForm}
              label={"로그인"}
            />
            <Button
              className=" h-8 px-2 border border-gray-300 rounded-md cursor-pointer text-gray-400 "
              onClick={goToSignupForm}
              label={"회원가입"}
            />
          </div>
          </div>
  </nav>

  )
}
