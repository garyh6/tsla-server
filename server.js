require("dotenv").config();
const express = require("express");
import cors from "cors";
import mongoose from "mongoose";
import { corsOptions } from "./cors";
import vehicleRouter from "./routes";

const app = express();

app.use(cors(corsOptions));

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

app.use("/vehicles", vehicleRouter);

app.listen(process.env.SERVER_PORT, () =>
  console.log(`Server is running on localhost:${process.env.SERVER_PORT}`)
);
