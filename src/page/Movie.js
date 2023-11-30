import React from 'react'
import Top5 from '../components/Top5'
import mvimg1 from '../images/mvTop/mv범죄도시.jpg'
import mvimg2 from '../images/mvTop/mv러브포세일.jpg'
import mvimg3 from '../images/mvTop/mv밀수.jpg'
import mvimg4 from '../images/mvTop/mv엘리멘탈.jpg'
import mvimg5 from '../images/mvTop/mv비공식작전.jpg'
function Movie() {
    const bgArr = [
        { id: 1, img: mvimg1, vodname: "범죄도시3" },
        { id: 2, img: mvimg2, vodname: "러브 포 세일" },
        { id: 3, img: mvimg3, vodname: "밀수" },
        { id: 4, img: mvimg4, vodname: "엘리멘탈" },
        { id: 5, img: mvimg5, vodname: "비공식작전" },
      ];
  return (
    <div className="max-w-[1100px] w-[1100px] mx-auto text-center my-10"> 
    <div className='mb-20'>
          <div className="text-center">
            <p>영화 인기 TOP5</p>
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
export default Movie