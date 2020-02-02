import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import uuid from "uuid";
import { socket } from "../../sockets/sockets";
import "./streamView.scss";

const StreamView = () => {
  // todo should probably save to db - oh well
  const [streamLog, setStreamLog] = useState([]);
  const endOfLogRef = useRef();

  useEffect(() => {
    endOfLogRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start"
    });
  }, [streamLog]);

  // console.log("************ streamLog", streamLog);
  if (!socket.hasListeners("new stream data from vehicle")) {
    socket.on(
      "new stream data from vehicle",
      ({ vehicleId, temperature, x, y, datetime }) => {
        console.log("new stream data", vehicleId, temperature, x, y, datetime);
        const locationMsg = `${datetime} - Vehicle ${vehicleId} is at (${x}, ${y}).`;
        const tempMsg = `${datetime} - Vehicle ${vehicleId} temperature is ${temperature} C.`;

        // not sure what's going on here - [...streamLog, new stuff]
        // streamLog always []
        setStreamLog(msg => [...msg, locationMsg, tempMsg]);

        axios({
          method: "patch",
          url: `/vehicles/${vehicleId}/internal`,
          data: {
            temperature,
            x,
            y
          }
        })
          .then(res => {
            // need to update component state of properties....
            console.log("************ updated");
          })
          .catch(err => {});
      }
    );
  }

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
