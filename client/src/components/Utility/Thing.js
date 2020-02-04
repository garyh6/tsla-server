import React, { useState } from "react";
const Thing = () => {
  const [dragging, setDragging] = useState(false);
  const [translate, setTranslate] = useState({ x: 200, y: 200 });

  const onMouseDown = e => {
    setDragging(true);
  };

  const onMouseMove = e => {
    if (dragging) {
      setTranslate({
        x: e.clientX,
        y: e.clientY
      });
    }
  };

  const onMouseUp = e => {
    setDragging(false);
  };

  const style = {
    cursor: dragging ? "-webkit-grabbing" : "-webkit-grab",
    transform: `translate(${translate.x}, ${translate.y}) translateZ(0)`,
    transition: dragging ? "none" : "transform 300ms"
  };

  return (
    <g>
      <circle
        style={style}
        cx={translate.x}
        cy={translate.y}
        r="10"
        fill="blue"
        stroke="black"
      />
      <circle
        opacity="0"
        r="45"
        cx={translate.x}
        cy={translate.y}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      ></circle>
    </g>
  );
};

export default Thing;
