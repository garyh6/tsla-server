import React, { useState } from "react";
const Draggable = ({ children, origin }) => {
  const [dragging, setDragging] = useState(false);
  const [translate, setTranslate] = useState({
    x: origin?.x || 200,
    y: origin?.y || 200
  });

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

  // todo should reset if dragging outside of box
  const onMouseUp = e => {
    setDragging(false);
  };

  const style = {
    cursor: dragging ? "-webkit-grabbing" : "-webkit-grab",
    transform: `translate(${translate.x}, ${translate.y})`,
    transition: dragging ? "none" : "transform 300ms"
  };

  const propsToChildren = () => {
    const newChildren = React.Children.map(children, child => {
      return React.cloneElement(child, {
        ...child.props,
        cx: translate.x,
        cy: translate.y
      });
    });

    return newChildren;
  };

  return (
    <g>
      {propsToChildren()}
      <circle
        style={style}
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

export default Draggable;
