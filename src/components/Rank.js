import React, { useState, useEffect } from "react";
import { IoStar } from "react-icons/io5";

const ARRAY = [0, 1, 2, 3, 4];

function Rank() {
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [hovered, setHovered] = useState([false, false, false, false, false]);
  const [score, setScore] = useState(0);
  const scoreContent = (score) => {
    switch (score) {
      case 1:
        return <div>1점 별로예요😡</div>;
      case 2:
        return <div>2점 그저그래요🙁</div>;
      case 3:
        return <div>3점 괜찮아요😑 </div>;
      case 4:
        return <div>4점 좋아요🙂</div>;
      case 5:
        return <div>5점 최고예요😀</div>;
      default:
        return <div>선택하세요</div>;
    }
  };
  const handleStarClick = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  useEffect(() => {
    let score =
      clicked.filter(Boolean).length || hovered.filter(Boolean).length;

    setScore(score);
    // sendReview();
  }, [clicked, hovered]); //컨디마 컨디업

  return (
    <>
      <div >
        <div className="flex">
          {ARRAY.map((el, idx) => {
            return (
              <IoStar
                key={idx}
                size="50"
                onClick={() => handleStarClick(el)}
                onMouseEnter={() => {
                  let hoverStates = [{ ...hovered }];
                  for (let i = 0; i < 5; i++) {
                    hoverStates[i] = i <= el ? true : false;
                  }
                  setHovered(hoverStates);
                }}
                onMouseLeave={() =>
                  setHovered([false, false, false, false, false])
                }
                style={{
                  color: hovered[el] || clicked[el] ? "#C62A5B" : "#BDBDBD",
                }}
              />
            );
          })}
        </div>
        {scoreContent(score)}
      </div>
    </>
  );
}

export default Rank;
