require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

var whitelist = ["http://localhost:4000/", "http://127.0.0.1:4000/"];
const corsOptions = {
  origin: function(origin, callback) {
    console.log("************ origin", origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};
app.use(cors(corsOptions));

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

const vehicleRouter = require("./routes");
app.use("/vehicles", vehicleRouter);

app.listen(4000, () => console.log("Server is running on localhost:4000"));
