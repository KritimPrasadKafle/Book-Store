import express from "express";
import mongoose from "mongoose";
import booksRouter from "./routes/bookRoutes.routes";
import cors from "cors";
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const MONGODB_URL = process.env.MONGODB_URL;
if (!MONGODB_URL) {
  throw new Error("MONGODB_URL is not defined in the environment variables");
}

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("App connected to database");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/books", booksRouter);

app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
});
