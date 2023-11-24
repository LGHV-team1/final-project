import styled from "styled-components";
import { useState, useEffect } from "react";

const ARRAY = [0, 1, 2, 3, 4];

export default function Star({ AVR_RATE}) {
  const percentAVR_RATE = AVR_RATE * 20
  const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0]);
  const calcStarRates = () => {
    let tempStarRatesArr = [0, 0, 0, 0, 0];
    let starVerScore = (percentAVR_RATE * 70) / 100;
    let idx = 0;
    while (starVerScore > 14) {
      tempStarRatesArr[idx] = 14;
      idx += 1;
      starVerScore -= 14;
    }
    tempStarRatesArr[idx] = starVerScore;
    return tempStarRatesArr;
  };
  useEffect(() => {
    setRatesResArr(calcStarRates);
  }, [AVR_RATE]);
  return (
    <div>
      <div>별점 {AVR_RATE}</div>
      <div className="flex">
        {ARRAY.map((item, idx) => {
          return (
            <span key={`${item}_${idx}`}>
              <svg width="50" height="50" viewBox="0 0 14 14" fill="#cacaca">
                <clipPath id={`${item}StarClip`}>
                  <rect width={`${ratesResArr[idx]}`} height="50" />
                </clipPath>
                <path
                  id={`${item}Star`}
                  d="M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z"
                  transform="translate(-2 -2)"
                />
                <use
                  clipPath={`url(#$ {item}StarClip)`}
                  href={`#${item}Star`}
                  fill="#C62A5B"
                />
              </svg>
            </span>
          );
        })}
      </div>
    </div>
  );
}
