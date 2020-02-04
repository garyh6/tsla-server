import { Col } from "antd";
import React, { useContext, useState } from "react";
import uuid from "uuid";
import { Context } from "../../contexts/VehiclesContext";
import SVG from "./gridSVG";
import "./map.scss";

const Vehicle = ({ data: { x, y } }) => {
  return <circle cx={x} cy={y} r="10" fill="#ff80b0" stroke="black" />;
};

const Thing = ({ x, y }) => {
  const [position, setPosition] = useState({ x: 200, y: 200 });
  return <circle cx={x} cy={y} r="10" fill="#ff80b0" stroke="black" />;
};

const Map = () => {
  const { vehicles } = useContext(Context);

  return (
    <div className="wrapper-map">
      <Col span={24}>
        <SVG
          width={window.innerWidth}
          height="500"
          viewBox={`0 0 ${window.innerWidth} 500`}
          fill="#cbf1f5"
        >
          {vehicles.map(data => (
            <Vehicle data={data} key={uuid()}></Vehicle>
          ))}
        </SVG>
      </Col>
    </div>
  );
};

export default Map;
