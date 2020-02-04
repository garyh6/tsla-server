import { Col } from "antd";
import React, { useContext } from "react";
import { Context } from "../../contexts/VehiclesContext";
import Properties from "../Properties";
import "./properties.scss";
const Vehicles = () => {
  const { vehicles, loading } = useContext(Context);
  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
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
        </>
      )}
    </>
  );
};

export default Vehicles;
