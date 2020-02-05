import { Col } from "antd";
import React, { useContext } from "react";
import uuid from "uuid";
import { Context } from "../../contexts/VehiclesContext";
import Draggable from "../Utility/DraggableWrapper";
import Thing from "../Utility/Thing";
import SVG from "./gridSVG";
import "./map.scss";

const Vehicle = ({ data: { x, y }, fill }) => {
  return (
    <Draggable origin={{ x, y }}>
      <circle cx={x} cy={y} r="10" fill={fill} stroke="black" />
    </Draggable>
  );
};

const Map = () => {
  const { vehicles } = useContext(Context);

  const colors = ["#f57170", "#d54140", "#ff0200", "#8e3938", "#ff80b0"];

  return (
    <div className="wrapper-map">
      <Col span={24}>
        <SVG
          width={window.innerWidth}
          height="500"
          viewBox={`0 0 ${window.innerWidth} 500`}
          fill="#cbf1f5"
        >
          {vehicles.map((data, idx) => (
            <Vehicle data={data} key={uuid()} fill={colors[idx]}></Vehicle>
          ))}
          <Thing></Thing>
        </SVG>
      </Col>
    </div>
  );
};

export default Map;
