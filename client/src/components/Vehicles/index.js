import { Col } from "antd";
import React from "react";
import Properties from "../Properties";
import "./properties.scss";
const Vehicles = ({ vehicles }) => {
  console.log("************ vehicles", vehicles);
  return (
    <div className="wrapper-properties">
      <Col span={24}>
        <h1>Vehicle Properties</h1>
      </Col>
      {vehicles.map(obj => (
        <Col span={24} key={obj._id}>
          <Properties vehicleConfig={obj}></Properties>
        </Col>
      ))}
    </div>
  );
};

export default Vehicles;
