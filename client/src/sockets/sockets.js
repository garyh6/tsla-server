import axios from "axios";
import io from "socket.io-client";
import { userId } from "../utils";
export const socket = io("http://localhost:5000", {
  reconnection: true,
  query: {
    id: userId,
    type: "Controller"
  }
});

export const emitPatchProperty = (data, cb) => {
  console.log("************ socket.js emit patch", data);
  socket.emit("patch property from control", data, (err, res) => {
    console.log("something back");
    if (err) return cb(err);
    cb(null, res);
  });
};

export const emitDeleteProperty = (data, cb) => {
  console.log("************ emit delete");
  socket.emit("delete property from control", data, (err, res) => {
    console.log("got back from delete");
    if (err) return cb(err);
    cb(null, res);
  });
};

export const streamEvents = ({ setStreamLog }, cb) => {
  socket.removeAllListeners("new stream data from vehicle");
  socket.on(
    "new stream data from vehicle",
    ({ vehicleId, temperature, x, y, datetime }) => {
      // console.log("new stream data", vehicleId, temperature, x, y, datetime);
      const locationMsg = `${datetime} - Vehicle ${vehicleId} is at (${x}, ${y}).`;
      const tempMsg = `${datetime} - Vehicle ${vehicleId} temperature is ${temperature} C.`;

      // not sure what's going on here - [...streamLog, new stuff]
      // streamLog always []
      setStreamLog(msg => [...msg, locationMsg, tempMsg]);

      try {
        axios({
          method: "patch",
          url: `/vehicles/${vehicleId}/internal`,
          data: {
            temperature,
            x,
            y
          }
        });
        // need to update component state of Properties
        // console.log("************ updating dd", vehicles);
        // this will so die with more vehicles
        return cb(null, { vehicleId, temperature, x, y });
      } catch (err) {}
    }
  );
};
