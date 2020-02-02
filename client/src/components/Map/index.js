import React, { useContext } from "react";
import { Canvas } from "react-three-fiber";
import { BackDrop, GroundPlane, Plane, Sphere } from "../../three";
import { FillLight, KeyLight, RimLight } from "../../three/lights";
import { Context } from "../../VehiclesContext";
import "./map.scss";

const Map = () => {
  const { vehicles, updateVehicle } = useContext(Context);
  console.log("************ vehicles in map", vehicles);
  return (
    <div className="wrapper-map">
      <Canvas>
        <KeyLight brightness={5.6} color="#ffbdf4" />
        <FillLight brightness={2.6} color="#bdefff" />
        <RimLight brightness={54} color="#fff" />
        <Sphere args={[1, 16, 16]} position={[0, 0, -2]} />
        <BackDrop />
        <GroundPlane />
        <Plane />
      </Canvas>
    </div>
  );
};

export default Map;
