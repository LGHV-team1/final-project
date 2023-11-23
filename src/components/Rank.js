import React, { useState, useEffect } from "react";

const ARRAY = [0, 1, 2, 3, 4];

function Rank(props) {
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
    let realScore = clicked.filter(Boolean).length;
    setScore(score);
    try {
      props.onScoreChange(realScore);
      setScore(0)
    } catch (err) {
      console.log(err);
    }
  }, [clicked]);
  useEffect(() => {
    let score =
      clicked.filter(Boolean).length || hovered.filter(Boolean).length;
    setScore(score);
  }, [clicked, hovered]); //컨디마 컨디업

  return (
    <>
      <div>
        <div className="flex">
          {ARRAY.map((item, idx) => {
            return (
              <div>
                <svg
                  key={idx}
                  width="50"
                  height="50"
                  viewBox="0 0 14 14"
                  fill={hovered[item] || clicked[item] ? "#C62A5B" : "#BDBDBD"}
                  onClick={() => handleStarClick(item)}
                  onMouseEnter={() => {
                    let hoverStates = [...hovered]; // 새 배열을 만들기 위해 스프레드 연산자 사용
                    for (let i = 0; i < 5; i++) {
                      hoverStates[i] = i <= item ? true : false;
                    }
                    setHovered(hoverStates);
                  }}
                  onMouseLeave={() =>
                    setHovered([false, false, false, false, false])
                  }
                >
                  <path
                    d="M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z"
                    transform="translate(-2 -2)"
                  />
                </svg>
              </div>
            );
          })}
        </div>
        {scoreContent(score)}
      </div>
    </>
  );
}

export default React.memo(Rank);
