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
  socket.emit("patch property from control", data, (err, res) => {
    if (err) return cb(err);
    cb(null, res);
  });
};

export const emitDeleteProperty = (data, cb) => {
  socket.emit("delete property from control", data, (err, res) => {
    if (err) return cb(err);
    cb(null, res);
  });
};

export const streamEvents = ({ setStreamLog }, cb) => {
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
        // need to update component state of Properties
        // this will so die with more vehicles
        return cb(null, { vehicleId, temperature, x, y });
      } catch (err) {
        if (err) return console.log("patch err", err);
      }
    }
  );
};
