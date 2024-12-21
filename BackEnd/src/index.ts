import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const MONGODB_URL = process.env.MONGODB_URL;
if (!MONGODB_URL) {
  throw new Error("MONGODB_URL is not defined in the environment variables");
}
const app = express();
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("App connected to database");
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res): any => {
  console.log(req);
  return res.status(234).send("welcome to Mern stack");
});

app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
});
