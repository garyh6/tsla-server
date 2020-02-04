import React, { createContext } from "react";
import io from "socket.io-client";
import { userId } from "../utils";
export const SocketContext = createContext({});

export const SocketProvider = props => {
  const { children } = props;
  const socket = io("http://localhost:5000", {
    query: {
      id: userId,
      type: "Controller"
    }
  });

  const emitPatchProperty = (data, cb) => {
    socket.emit("patch property from control", data, (err, res) => {
      if (err) return cb(err);
      cb(null, res);
    });
  };

  const emitDeleteProperty = (data, cb) => {
    socket.emit("delete property from control", data, (err, res) => {
      if (err) return cb(err);
      cb(null, res);
    });
  };

  const socketContext = {
    socket,
    emitPatchProperty,
    emitDeleteProperty
  };

  return (
    <SocketContext.Provider value={socketContext}>
      {children}
    </SocketContext.Provider>
  );
};

export const { Consumer } = SocketContext;
