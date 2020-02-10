import { Col, Row } from "antd";
import "antd/dist/antd.css";
import React from "react";
import "./App.css";
import Map from "./components/Map";
import StreamView from "./components/StreamView";
import ThreePlane from "./components/ThreePlane";
import Vehicles from "./components/Vehicles";
import { SocketProvider } from "./contexts/SocketContext";
import { Provider } from "./contexts/VehiclesContext";

function App() {
  return (
    <div className="App">
      <SocketProvider>
        <Provider>
          <Row span={24}>
            <ThreePlane></ThreePlane>
          </Row>
          <Row span={24}>
            <Map></Map>
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
      </SocketProvider>
    </div>
  );
}

export default App;
