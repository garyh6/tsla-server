import React, { useContext } from "react";
import uuid from "uuid";
import { Context } from "../../VehiclesContext";
import SVG from "./gridSVG";
import "./map.scss";

const Vehicle = ({ data: { x, y } }) => {
  console.log("************ data", x, y);

  return <circle cx={x} cy={y} r="10" fill="#ff80b0" stroke="black" />;
};

const Map = () => {
  const { vehicles } = useContext(Context);
  console.log("************ vehicles in map", vehicles);
  console.log("************ window", window);

  return (
    <div className="wrapper-map">
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
    </div>
  );
};

export default Map;
