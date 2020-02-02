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
    try {
      const { data } = await axios.get("/vehicles");
      setVehicles(data);
      setLoading(false);
    } catch (err) {
      if (err) return console.log(err);
    }
  };

  useEffect(() => {
    getVehicles();
  }, []);

  const updateVehicle = ({ vehicleId, temperature, x, y, datetime }) => {
    console.log("************ vehicleId", vehicleId);
    const idx = vehicles.findIndex(obj => obj._id === vehicleId);

    console.log("************ idx", idx);
    const newVehicle = { ...vehicles[idx], temperature, x, y };
    const newVehicles = [...vehicles];
    newVehicles.splice(idx, 1, newVehicle);
    console.log("************ newVehicle", newVehicle);

    setVehicles(newVehicle);
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
