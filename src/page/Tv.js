import React from 'react'
import Top5 from '../components/Top5'
import tvimg1 from '../images/tvTop/tv연인.jpg'
import tvimg2 from '../images/tvTop/tv런닝맨.jpg'
import tvimg3 from '../images/tvTop/tv꼬꼬무.jpg'
import tvimg4 from '../images/tvTop/tv최강배달꾼.png'
import tvimg5 from '../images/tvTop/tv소방서.jpg'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

function Tv() {
  const category = useSelector((state) => state.category.value)
  const location = useLocation(); 
  const searchParams = new URLSearchParams(location.search);
  const searchWord = searchParams.get("searchWord");

    const bgArr = [
        { id: 1, img: tvimg1, vodname: "연인" },
        { id: 2, img: tvimg2, vodname: "런닝맨" },
        { id: 3, img: tvimg3, vodname: "꼬리에 꼬리를 무는 그날 이야기" },
        { id: 4, img: tvimg4, vodname: "최강 배달꾼" },
        { id: 5, img: tvimg5, vodname: "소방서 옆 경찰서 그리고 국과수" },
      ];
  if (searchWord === "null")    
  return (
    <div className="max-w-[1100px] w-[1100px] mx-auto text-center my-10"> 
    <div className='mb-20'>
          <div className="text-center">
            <p>TV 인기 TOP5</p>
          </div>
        <div className="text-center mt-3">
        </div>
    </div>
  </div>

  )
}
{/* const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
} */}
export default Tv