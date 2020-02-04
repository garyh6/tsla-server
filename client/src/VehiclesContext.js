import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
export const Context = createContext({});

export const Provider = props => {
  // console.log("************ props", props);
  const { children } = props;
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  // console.log("************ value", value);
  // console.log("************ vehicles", vehicles);

  const getVehicles = async () => {
    console.log(
      "************ REACT_APP_DEV_SERVER",
      process.env.REACT_APP_DEV_SERVER
    );
    try {
      const { data } = await axios.get(
        `http://${process.env.REACT_APP_DEV_SERVER}/vehicles`
      );
      setVehicles(data);
      setLoading(false);
      // console.log("set vehiclessss");
      // console.log("************ data", data);
    } catch (err) {
      if (err) return console.log("error getting vehicles", err);
    }
  };

  useEffect(() => {
    getVehicles();
  }, []);

  const updateVehicle = ({ vehicleId, temperature, x, y }) => {
    console.log("************ vehicles", vehicles);
    console.log("************ vehicleId", vehicleId);
    if (!vehicles.length) return;
    const idx = vehicles.findIndex(obj => obj._id === vehicleId);

    console.log("************ idx", idx);
    const newVehicle = { ...vehicles[idx], temperature, x, y };
    const newVehicles = [...vehicles];
    newVehicles[idx] = newVehicle;

    console.log("************ newVehicle", newVehicles);

    setVehicles(newVehicles);
  };

  const vehiclesContext = {
    vehicles,
    setVehicles,
    updateVehicle,
    loading,
    setLoading
  };

  return (
    <Context.Provider value={vehiclesContext}>{children}</Context.Provider>
  );
};

export const { Consumer } = Context;
