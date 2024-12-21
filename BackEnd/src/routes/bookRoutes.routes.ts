import mongoose from "mongoose";
import express from "express";
import BookModel from "../models/book.models";

import { z } from "zod";

const booksRouter = express.Router();

//@ts-ignore
booksRouter.post("/", async (req, res) => {
  try {
    const bookValidate = z.object({
      title: z.string(),
      author: z.string(),
      publishYear: z.number(),
    });

    const result = bookValidate.safeParse(req.body);
    console.log(result);

    if (!result.success) {
      return res
        .status(400)
        .json({ message: "Invalid data", errors: result.error.errors });
    }

    const newBook = new BookModel(result.data);

    await newBook.save();
    return res
      .status(201)
      .json({ message: "Book saved successfully", data: result.data });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//@ts-ignore
booksRouter.get("/", async (req, res) => {
  try {
    const books = await BookModel.find({});

    return res.status(200).json(books);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
//@ts-ignore
booksRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const book = await BookModel.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json(book);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//@ts-ignore
booksRouter.put("/:id", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }
    if (!title || !author || !publishYear) {
      return res.status(400).json({ message: "Please provide all fields" });
    }
    const result = await BookModel.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).send({ message: "Book updated successfully" });
  } catch (error: any) {
    console.log(error.message);
  }
});

//@ts-ignore
booksRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }
    const result = BookModel.findByIdAndDelete(id, req.body);
    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error: any) {
    console.log(error.message);
  }
});

export default booksRouter;
