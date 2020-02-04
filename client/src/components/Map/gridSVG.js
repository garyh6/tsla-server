import React from "react";

const SVG = ({
  style = {},
  fill = "#000",
  width = "100%",
  height = "100%",
  className = "",
  viewBox = "0 0 500 500",
  children
}) => {
  const line = {
    stroke: "black",
    strokeDasharray: "1, 50",
    strokeWidth: width
  };
  return (
    <svg width={width} height={height} viewBox={viewBox}>
      <rect fill={fill} width="100%" height="100%" />
      <line
        x1="0"
        y1={height / 2}
        x2={width}
        y2={height / 2}
        style={line}
      ></line>
      <line
        x1={width / 2}
        y1="0"
        x2={width / 2}
        y2={height}
        style={line}
      ></line>
      {children}
    </svg>
  );
};
export default SVG;
