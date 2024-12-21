import mongoose, { Schema, model } from "mongoose";

interface Book {
  title: string;
  author: string;
  publishYear: Date;
}

const bookSchema = new Schema<Book>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BookModel = model<Book>("Book", bookSchema);

export default BookModel;
