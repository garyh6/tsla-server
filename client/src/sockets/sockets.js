import React from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000", {
  query: `id=MAINCONTROLLEREREREERR`
});
// change to uuid, what happens when multiple controllers are connected (will break)

const SocketContext = React.createContext(socket);
export default SocketContext;

export const emitPatchProperty = (data, cb) => {
  console.log("************ server data", data);
  console.log("************ abou tot emit");
  socket.emit("patch property from control", data, (err, res) => {
    console.log("something back");
    if (err) return cb(err);
    cb(null, res);
  });
};

socket.on("acknowledge update to control", ({ key, value, id }) => {
  // todo - this gets called twice (probably once for each vehicle)
  console.log("************ acknowledge update to control", key, value);
  // should update state and then save to db?
  // axios({
  //   method: "patch",
  //   url: `/vehicles/${id}`,
  //   data: {
  //     key,
  //     value
  //   }
  // })
  //   .then(res => {
  //     console.log("************ addProperty res", res);
  //   })
  //   .catch(err => console.log("************ addProperty err", err));
  // if this fails delivered prop will be erased
});
