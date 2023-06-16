import React from "react";
import "./Screen.css";

const Screen = ({ value }) => {
  return (
    <div className="screen">
      {value.toLocaleString(undefined, { maximumFractionDigits: 12 })}
    </div>
  );
};
export default Screen;
