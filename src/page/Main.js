import React from 'react'
import Top5 from '../components/Top5'
import mainimg1 from '../images/tvTop/tv연인.jpg'
import mainimg2 from '../images/mvTop/mv범죄도시.jpg'
import mainimg3 from '../images/tvTop/tv런닝맨.jpg'
import mainimg4 from '../images/tvTop/tv꼬꼬무.jpg'
import mainimg5 from '../images/tvTop/tv최강배달꾼.png'

function Main() {
    const bgArr = [
      { id: 1, img: mainimg1, vodname: "연인" },
      { id: 2, img: mainimg2, vodname: "범죄도시3" },
      { id: 3, img: mainimg3, vodname: "런닝맨" },
      { id: 4, img: mainimg4, vodname: "꼬리에 꼬리를 무는 그날 이야기" },
      { id: 5, img: mainimg5, vodname: "최강 배달꾼" },
      ];
  return (
    <div className="max-w-[1100px] w-[1100px] mx-auto text-center my-10"> 
    <div className='mb-20'>
          <div className="text-center">
            <p>인기 TOP5</p>
          </div>
        <div className="text-center mt-3">
          <Top5 images={bgArr}/>
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
export default Main