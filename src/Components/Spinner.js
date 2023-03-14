import React from "react";
import loader from "../Assets/svg/DualBall.svg";

export default function Spinner() {
  return (
    <div className="flex items-center justify-center fixed left-0 right-0 top-0 bottom-0 z-50 ">
      <div>
        <img src={loader} alt="Loading..." className="h-40" />
      </div>
    </div>
  );
}
