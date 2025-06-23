import { Request, Response } from "express";
import Book from "../models/Books";

// GET 
const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { author, categories, title, includeDeleted } = req.query;
    const filter: any = {};

    if (author) filter.author = author;

    if (categories) {
      const categoryArray = (categories as string).split(",");
      filter.categories = { $in: categoryArray };
    }

    if (title) {
      filter.title = { $regex: new RegExp(title as string, "i") };
    }

    if (!includeDeleted || includeDeleted === "false") {
      filter.deleted = false;
    }

    const allBooks = await Book.find(filter)
      .populate("author")
      .populate("categories");

    res.json(allBooks);
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      error: `Error fetching books: ${error}`,
    });
  }
};

// GET - Get a single book
const getBookById = async (req: Request, res: Response) => {
  try {
    const { bookID } = req.params;
    const foundBook = await Book.findOne({
      _id: bookID,
      deleted: false,
    }).populate("author").populate("categories");

    if (foundBook) {
      res.json(foundBook);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error retrieving book" });
  }
};

// POST - Create a new book
const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author, categories } = req.body;
    const coverImage = req.file?.filename;
    const newBook = await Book.create({
      title,
      author,
      categories,
      coverImage,
    });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: "Error creating book" });
  }
};

// PUT - Update a book
const updateBook = async (req: Request, res: Response) => {
  try {
    const { bookID } = req.params;
    const { title, author, categories } = req.body;
    const coverImage = req.file?.filename;

    const updateData: any = { title, author, categories };
    if (coverImage) updateData.coverImage = coverImage;

    const updatedBook = await Book.findByIdAndUpdate(bookID, updateData, {
      new: true,
    }).populate("author").populate("categories");

    if (updatedBook) {
      res.json(updatedBook);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating book" });
  }
};

// DELETE - Soft delete a book
const deleteBook = async (req: Request, res: Response) => {
  try {
    const { bookID } = req.params;

    const deletedBook = await Book.findByIdAndUpdate(
      bookID,
      { deleted: true },
      { new: true }
    );

    if (deletedBook) {
      res.status(200).json({
        status: "Success",
        message: "Book marked as deleted.",
      });
    } else {
      res.status(404).json({ error: "Book not found." });
    }
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      error: `Error deleting book: ${error}`,
    });
  }
};

export {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
