const express = require("express");
const router = express.Router();
const Vehicle = require("./vehicleModel");

// Get all Vehicles
router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    console.log("************ vehicles", vehicles);
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get One Vehicle
// router.get("/:id", getVehicle, (req, res) => {
//   res.json(res.vehicle);
// });

// Update Properties of Vehicle
router.patch("/:id", getVehicle, async (req, res) => {
  if (req.body.properties != null) {
    res.vehicle.properties = req.body.properties;
  }

  try {
    const updatedVehicle = await res.vehicle.save();
    res.json(updatedVehicle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete Properties of Vehicle
router.delete("/:id", getVehicle, async (req, res) => {
  if (req.body.properties != null) {
    res.vehicle.properties = req.body.properties;
  }

  try {
    const updatedVehicle = await res.vehicle.save();
    res.json(updatedVehicle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

async function getVehicle(req, res, next) {
  let vehicle;
  try {
    vehicle = await Vehicle.findById(req.params.id);
    if (vehicle == null) {
      return res.status(404).json({ message: "Cannot find vehicle" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.vehicle = vehicle;
  next();
}

module.exports = router;
