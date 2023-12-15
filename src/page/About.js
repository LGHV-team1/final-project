import img1 from "../images/About/도현.jpg"
import img2 from "../images/About/수정.jpg"
import img3 from "../images/About/준호.jpg"
import img4 from "../images/About/지민.jpg"
import img5 from "../images/About/한경.jpg"
import img6 from "../images/About/효심.jpg"

function About() {

    return(
        <div className=" mx-28 p-5 text-center pb-11 text-gray-300 h-full">
            <div className="mb-5 ">
                <h1>웹 사이트 소개</h1>
                <p> 안녕하세요! 저희는 Rec=VoD팀입니다. <br/>
                이 웹사이트는 LG헬로비전 DX DATA SCHOOL 1기 프로젝트로 <br/>
                VOD를 추천하는 서비스를 제공합니다.</p>

            </div>
            <hr
            style={{
              height: "3px",
              backgroundColor: "#999",
              marginBottom: "3%",
            }}
          ></hr>
            <div className="mb-10 ">
                <h1>팀 소개</h1>
                <div className="mt-3">
                    <div className="text-center inline-block">
                        <img src={img1} alt="도현" width="200px" className="mr-2 mb-2 inline-block"></img>
                        <p>김도현<br/>Data Analysis</p>
                    </div>
                    <div className="text-center inline-block">
                        <img src={img2} alt="수정" width="200px" className="mr-2 mb-2 inline-block"></img>
                        <p>김수정<br/>Data Analysis</p>
                    </div>
                    <div className="text-center inline-block">
                        <img src={img3} alt="준호" width="200px" className="mr-2 mb-2 inline-block"></img>
                        <p>송준호<br/>Data Analysis</p>
                    </div>
                </div>
                <div>
                    <div className="text-center inline-block">
                        <img src={img4} alt="지민" width="200px" className="mr-2 mb-2 inline-block"></img>
                        <p>김지민<br/>Back-end, CI/CD</p>
                    </div>
                    <div className="text-center inline-block">
                        <img src={img5} alt="한경" width="200px" className="mr-2 mb-2 inline-block"></img>
                        <p>김한경<br/>Front-end</p>
                    </div>
                    <div className="text-center inline-block">
                        <img src={img6} alt="효심" width="200px" className="mr-2 mb-2 inline-block"></img>
                        <p>박효심<br/>Front-end, Back-end</p>
                    </div>
                </div>
            </div>




        </div>


    )



}

export default About