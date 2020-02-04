import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import uuid from "uuid";
import { SocketContext } from "../../contexts/SocketContext";
import { Context } from "../../contexts/VehiclesContext";
import "./streamView.scss";
const StreamView = () => {
  const { socket } = useContext(SocketContext);
  // todo should probably save to db - oh well
  const [streamLog, setStreamLog] = useState([]);
  const endOfLogRef = useRef();
  const { updateVehicle } = useContext(Context);

  useEffect(() => {
    // tod0 is this causing Forced reflow while executing JavaScript
    endOfLogRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }, [streamLog]);

  socket.removeAllListeners("new stream data from vehicle");
  socket.on(
    "new stream data from vehicle",
    async ({ vehicleId, temperature, x, y, datetime }) => {
      const locationMsg = `${datetime} - Vehicle ${vehicleId} is at (${x}, ${y}).`;
      const tempMsg = `${datetime} - Vehicle ${vehicleId} temperature is ${temperature} C.`;

      // not sure what's going on here - [...streamLog, new stuff]
      // streamLog always []
      setStreamLog(msg => [...msg, locationMsg, tempMsg]);

      try {
        await axios({
          method: "patch",
          url: `http://${process.env.REACT_APP_DEV_SERVER}/vehicles/${vehicleId}/internal`,
          data: {
            temperature,
            x,
            y
          }
        });
        updateVehicle({ vehicleId, temperature, x, y });
      } catch (err) {
        if (err) return console.log("patch err", err);
      }
    }
  );

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
