import React from "react";

const SVG = ({
  style = {},
  fill = "#000",
  width = "100%",
  height = "100%",
  className = "",
  viewBox = "0 0 32 32"
}) => {
  const line = {
    stroke: "black",
    strokeDasharray: "1,98,1,0",
    strokeWidth: "2000"
  };
  return (
    <svg width={width} height={height}>
      <rect fill={fill} width="100%" height="100%" />
      <line x1="0" y1="250" x2={width} y2="250" style={line}></line>
      <line x1="1000" y1="0" x2="1000" y2="500" style={line}></line>
    </svg>
  );
};
export default SVG;
