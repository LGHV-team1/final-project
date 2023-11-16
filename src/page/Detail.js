import React from "react";
import img1 from "../images/img1.jpg";
import Rank from "../components/Rank";
import Button from "../components/Button";
import Input from "../components/Input";
import { FaHeart } from "react-icons/fa6";
function Detail() {
  return (
    <>
      <div className="flex mx-28 mt-10 mb-10 gap-10 ">
        <img className="w-1/2  " src={img1} />
        <div className="w-1/2  ">
          <div>
            <div className="flex justify-between  ">
              <h1 className="flex-row my-5 font-bold "> 아이언맨 </h1>
              <Button
                className={
                  "flex items-center  my-5 py-2 bg-my-color  text-white  hover:bg-my-color/70 rounded px-4"
                }
                label={"위시리스트 추가"}
                icon={<FaHeart />}
              ></Button>{" "}
            </div>

            <p>
              천재적인 두뇌와 재능으로 세계 최강의 무기업체를 이끄는 CEO이자,
              타고난 매력으로 셀러브리티 못지않은 화려한 삶을 살아가던 억만장자
              토니 스타크. 아프가니스탄에서 자신이 개발한 신무기 발표를 성공리에
              마치고 돌아가던 그는 게릴라군의 갑작스런 공격에 의해 가슴에
              치명적인 부상을 입고 게릴라군에게 납치된다. 가까스로 목숨을 건진
              그에게 게릴라군은 자신들을 위한 강력한 무기를 개발하라며 그를
              위협한다. 그러나 그는 게릴라군을 위한 무기 대신, 탈출을 위한
              무기가 장착된 철갑수트를 몰래 만드는 데 성공하고, 그의 첫 수트인
              ‘Mark1’를 입고 탈출에 성공한다. 미국으로 돌아온 토니 스타크는
              자신이 만든 무기가 많은 사람들의 생명을 위협하고, 세상을 엄청난
              위험에 몰아넣고 있다는 사실을 깨닫고 무기사업에서 손 뗄 것을
              선언한다. 그리고, Mark1을 토대로 최강의 하이테크 수트를 개발하는
              데 자신의 천재적인 재능과 노력을 쏟아 붓기 시작한다.
            </p>
          </div>
        </div>
      </div>
      <div className="mx-28">
        <hr/>
        <Rank />
        <Input type={'text'} placeholder={"리뷰를 작성해주세요"} />
      </div>
    </>
  );
}

export default Detail;
