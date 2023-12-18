import React, { useState } from "react";
import ReactPlayer from "react-player";

function Streaming({id}) {
const [volume, setVolume] = useState("0")
  return (
    <>
<div className="z-10" style={{ position: "relative", width: "100%", height: "100%" }}>
      <ReactPlayer
        width="100%"
        height="100%"
        url={`https://rvdshortvideo.s3.ap-northeast-2.amazonaws.com/sv${id}.mp4`}
        playing={true}
        volume={volume}
        loop={true}
      />
      
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0), rgba(21,21,21,1))",
          zIndex: 10,
        }}
      >
       
      </div>
     
    </div>
    {volume==="0" ?  <button className="absolute top-40 left-40 bg-white z-50" onClick={()=> {setVolume("1")}}>소리키우기</button> : <button className="absolute top-40 left-40 bg-white z-50" onClick={()=> {setVolume("0")}}>소리끄기</button> }
     
     </>
  );
}

export default Streaming;
