import { Col, Row } from "antd";
import "antd/dist/antd.css";
import React from "react";
import "./App.css";
import StreamView from "./components/StreamView";
import Vehicles from "./components/Vehicles";
import { Provider } from "./VehiclesContext";

function App() {
  return (
    <div className="App">
      <Provider>
        <Row span={24}>
          <div>MAP</div>
        </Row>
        <Row span={24}>
          <Col span={8}>
            <Vehicles></Vehicles>
          </Col>
          <Col span={16}>
            <StreamView></StreamView>
          </Col>
        </Row>
      </Provider>
    </div>
  );
}

export default App;
