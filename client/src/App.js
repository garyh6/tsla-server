import { Col, Row } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import StreamView from "./components/StreamView";
import Vehicles from "./components/Vehicles";
function App() {
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    axios
      .get("/vehicles")
      .then(res => setVehicles(res.data))
      .catch(err => {
        console.log("************ err", err);
      });
  }, []);

  return (
    <div className="App">
      <Row span={24}>
        <div>MAP</div>
      </Row>
      <Row span={24}>
        <Col span={8}>
          <Vehicles vehicles={vehicles}></Vehicles>
        </Col>
        <Col span={16}>
          <StreamView></StreamView>
        </Col>
      </Row>
    </div>
  );
}

export default App;
