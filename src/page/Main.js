import React from 'react'
import Top5 from '../components/Top5'
import mainimg1 from '../images/MainTop/top1연인.jpg'
import mainimg2 from '../images/MainTop/top2범죄도시.jpg'
import mainimg3 from '../images/MainTop/top3런닝맨.jpg'
import mainimg4 from '../images/MainTop/top4꼬꼬무.jpg'
import mainimg5 from '../images/MainTop/top5최강배달꾼.jpg'

function Main() {
    const bgArr = [
      { id: 1, img: mainimg1, vodname: "연인" },
      { id: 2, img: mainimg2, vodname: "범죄도시3" },
      { id: 3, img: mainimg3, vodname: "런닝맨" },
      { id: 4, img: mainimg4, vodname: "꼬리에 꼬리를 무는 그날 이야기" },
      { id: 5, img: mainimg5, vodname: "최강 배달꾼" },
      ];
  return (
    <div className="mx-44 mt-5 text-center"> 
    <div className='mb-20'>
          <div className="text-center">
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