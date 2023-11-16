import React, { useState } from "react";
import Input from "./Input";

export default function Review() {
  const [review, setReview] = useState("");
  const onHandlerReview = (e) => {
    setReview(e.target.value);
  };
  return (
    <div>
      <Input type="text" onChange={onHandlerReview} value={review} />
    </div>
  );
}
