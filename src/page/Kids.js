import React from 'react'
import Top5 from '../components/Top5'
import kidsimg1 from '../images/kidsTop/kids1타요.png'
import kidsimg2 from '../images/kidsTop/kids2뽀로로.jpg'
import kidsimg3 from '../images/kidsTop/kids3잠자는.jpg'
import kidsimg4 from '../images/kidsTop/kids4엘리.jpg'
import kidsimg5 from '../images/kidsTop/kids5마카앤로니.jpg'

function Kids() {
    const bgArr = [
      { id: 1, img: kidsimg1, vodname: "타요" },
      { id: 2, img: kidsimg2, vodname: "뽀로로" },
      { id: 3, img: kidsimg3, vodname: "잠자는" },
      { id: 4, img: kidsimg4, vodname: "엘리" },
      { id: 5, img: kidsimg5, vodname: "마카앤로니" },
      ];
  return (
    <div className="max-w-[1100px] w-[1100px] mx-auto text-center my-10"> 
    <div className='mb-20'>
          <div className="text-center">
            <p>키즈 인기 TOP5</p>
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
export default Kids