import axios from "axios";
import io from "socket.io-client";
export const socket = io("http://localhost:5000", {
  query: `id=MAINCONTROLLEREREREERR`
});
// change to uuid

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
  console.log("************ data", key, value);
  // should update state and then save to db?
  axios({
    method: "patch",
    url: `/vehicles/${id}`,
    data: {
      key,
      value
    }
  })
    .then(res => {
      //   let newConfig = { ...config };
      //   newConfig.properties[key] = value;

      //   setConfig(newConfig);
      console.log("************addProperty res", res);
    })
    .catch(err => console.log("************addProperty err", err));
});
