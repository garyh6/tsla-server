import React, { useContext, useEffect, useRef, useState } from "react";
import uuid from "uuid";
import { streamEvents } from "../../sockets/sockets";
import { Context } from "../../VehiclesContext";
import "./streamView.scss";

const StreamView = () => {
  // todo should probably save to db - oh well
  const [streamLog, setStreamLog] = useState([]);
  const endOfLogRef = useRef();
  const { vehicles, updateVehicle } = useContext(Context);
  // console.log("************ vehicles", vehicles);

  useEffect(() => {
    endOfLogRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start"
    });
  }, [streamLog]);

  useEffect(() => {
    streamEvents({ setStreamLog }, (err, { vehicleId, temperature, x, y }) => {
      console.log("************ var ");
      updateVehicle({ vehicleId, temperature, x, y });
    });
  }, [vehicles]);

  return (
    <div className="wrapper-stream">
      {streamLog.map(msg => (
        <p className="log-message" key={uuid()}>
          {msg}
        </p>
      ))}
      <div ref={endOfLogRef}></div>
    </div>
  );
};

export default StreamView;
