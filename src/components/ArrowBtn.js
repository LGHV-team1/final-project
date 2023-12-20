import React from "react";

export const Arrowright = ({ onClick }) => (
  <div
    style={{
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      right: "-40px",
      cursor: "pointer",
      zIndex: 20
    }}
    onClick={onClick}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#999">
      <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
    </svg>
  </div>
);

export const Arrowleft = ({ onClick }) => (
  <div
    style={{
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      left: "-30px",
      cursor: "pointer",
    }}
    onClick={onClick}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#999">
      <path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z" />
    </svg>
  </div>
);