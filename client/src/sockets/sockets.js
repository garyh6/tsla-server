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
  console.log("************ server data", data);
  console.log("************ abou tot emit");
  socket.emit("patch property from control", data, (err, res) => {
    console.log("something back");
    if (err) return cb(err);
    cb(null, res);
  });
};
