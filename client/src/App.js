import { Col, Row } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import Properties from "./components/Properties";
import StreamView from "./components/StreamView";
function App() {
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    // todo - axios
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
          <Properties vehicles={vehicles}></Properties>
        </Col>
        <Col span={16}>
          <StreamView></StreamView>
        </Col>
      </Row>
    </div>
  );
}

export default App;
