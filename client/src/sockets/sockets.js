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
