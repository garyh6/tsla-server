const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    id: String,
    title: {
      type: String
    },
    properties: {}
  },
  { collection: "vehicles" }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);
