"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const bookRoutes_routes_1 = __importDefault(require("./routes/bookRoutes.routes"));
const cors_1 = __importDefault(require("cors"));
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const MONGODB_URL = process.env.MONGODB_URL;
if (!MONGODB_URL) {
    throw new Error("MONGODB_URL is not defined in the environment variables");
}
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
mongoose_1.default
    .connect(MONGODB_URL)
    .then(() => {
    console.log("App connected to database");
})
    .catch((error) => {
    console.log(error);
});
app.use("/books", bookRoutes_routes_1.default);
app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
});
