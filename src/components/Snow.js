import React, { useState, useEffect } from "react";

function Snowflake({ id }) {
  const [animationDelay, setAnimationDelay] = useState("0s");
  const [fontSize, setFontSize] = useState("20px");

  useEffect(() => {
    const newDelay = `${(Math.random() * 16).toFixed(2)}s`;
    const newFontSize = `${Math.floor(Math.random() * 10) + 10}px`;
    setAnimationDelay(newDelay);
    setFontSize(newFontSize);
  }, []);

  const style = {
    animationDelay,
    fontSize,
    animationName: "fall",
    animationDuration: "20s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    color: "#FFFAFA",
    opacity: 0,
  };

  return (
    <p className="p-0 m-0 z-30" id={`item${id}`} style={style}>
      *
    </p>
  );
}

function Snow() {
  const numFlakes = 500;
  const snowflakes = Array.from({ length: numFlakes }, (_, i) => (
    <Snowflake key={i} id={i} />
  ));

  return <div className="relative">
  <div className="absolute flex justify-between top-[-128px] w-full h-[420px] overflow-hidden">
    {snowflakes}
  </div>
</div>;
}

export default Snow;
