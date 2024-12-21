"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const book_models_1 = __importDefault(require("../models/book.models"));
const zod_1 = require("zod");
const booksRouter = express_1.default.Router();
//@ts-ignore
booksRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookValidate = zod_1.z.object({
            title: zod_1.z.string(),
            author: zod_1.z.string(),
            publishYear: zod_1.z.number(),
        });
        const result = bookValidate.safeParse(req.body);
        console.log(result);
        if (!result.success) {
            return res
                .status(400)
                .json({ message: "Invalid data", errors: result.error.errors });
        }
        const newBook = new book_models_1.default(result.data);
        yield newBook.save();
        return res
            .status(201)
            .json({ message: "Book saved successfully", data: result.data });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}));
//@ts-ignore
booksRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield book_models_1.default.find({});
        return res.status(200).json(books);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}));
//@ts-ignore
booksRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid book ID" });
        }
        const book = yield book_models_1.default.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.status(200).json(book);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}));
//@ts-ignore
booksRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, author, publishYear } = req.body;
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid book ID" });
        }
        if (!title || !author || !publishYear) {
            return res.status(400).json({ message: "Please provide all fields" });
        }
        const result = yield book_models_1.default.findByIdAndUpdate(id, req.body);
        if (!result) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.status(200).send({ message: "Book updated successfully" });
    }
    catch (error) {
        console.log(error.message);
    }
}));
//@ts-ignore
booksRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid book ID" });
        }
        const result = book_models_1.default.findByIdAndDelete(id, req.body);
        if (!result) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.status(200).json({ message: "Book deleted successfully" });
    }
    catch (error) {
        console.log(error.message);
    }
}));
exports.default = booksRouter;
