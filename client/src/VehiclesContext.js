import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
export const Context = createContext({});

export const Provider = props => {
  const { children } = props;
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const getVehicles = async () => {
    try {
      const { data } = await axios.get(
        `http://${process.env.REACT_APP_DEV_SERVER}/vehicles`
      );
      setVehicles(data);
      setLoading(false);
    } catch (err) {
      if (err) return console.log("error getting vehicles", err);
    }
  };

  useEffect(() => {
    getVehicles();
  }, []);

  const updateVehicle = ({ vehicleId, temperature, x, y }) => {
    if (!vehicles.length) return;
    const idx = vehicles.findIndex(obj => obj._id === vehicleId);

    const newVehicle = { ...vehicles[idx], temperature, x, y };
    const newVehicles = [...vehicles];
    newVehicles[idx] = newVehicle;

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
