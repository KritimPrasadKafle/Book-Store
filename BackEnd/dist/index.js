"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const MONGODB_URL = process.env.MONGODB_URL;
if (!MONGODB_URL) {
    throw new Error("MONGODB_URL is not defined in the environment variables");
}
const app = (0, express_1.default)();
mongoose_1.default
    .connect(MONGODB_URL)
    .then(() => {
    console.log("App connected to database");
})
    .catch((error) => {
    console.log(error);
});
app.get("/", (req, res) => {
    console.log(req);
    return res.status(234).send("welcome to Mern stack");
});
app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
});
