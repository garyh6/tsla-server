import React, { useContext } from "react";
import { Context } from "../../VehiclesContext";
import SVG from "./gridSVG";
import "./map.scss";
const Map = () => {
  const { vehicles } = useContext(Context);
  console.log("************ vehicles in map", vehicles);
  console.log("************ window", window);
  return (
    <div className="wrapper-map">
      <SVG
        width={window.innerWidth}
        height="500"
        viewBox="0 0 100 100"
        fill="#cbf1f5"
      ></SVG>
    </div>
  );
};

export default Map;
