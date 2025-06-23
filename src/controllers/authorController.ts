import { Request, Response } from "express";
import Author from "../models/Authors";

// GET - Get all authors
export const getAllAuthors = async (req: Request, res: Response) => {
  try {
    const allAuthors = await Author.find().populate("books");
    res.json(allAuthors);
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      error: `Error fetching authors: ${error}`,
    });
  }
};

// GET - Get a single author by ID
export const getAuthorById = async (req: Request, res: Response) => {
  try {
    const { authorID } = req.params;
    const foundAuthor = await Author.findById(authorID).populate("books");

    if (foundAuthor) {
      res.json(foundAuthor);
    } else {
      res.status(404).json({ error: "Author not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error retrieving author" });
  }
};

// POST - Create a new author
export const createAuthor = async (req: Request, res: Response) => {
  try {
    const { name, country } = req.body;
    const newAuthor = await Author.create({ name, country });
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(500).json({ error: "Error creating author" });
  }
};

// PUT - Update an author
export const updateAuthor = async (req: Request, res: Response) => {
  try {
    const { authorID } = req.params;
    const { name, country } = req.body;

    const updatedAuthor = await Author.findByIdAndUpdate(
      authorID,
      { name, country },
      { new: true } // return the updated doc
    );

    if (updatedAuthor) {
      res.json(updatedAuthor);
    } else {
      res.status(404).json({ error: "Author not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating author" });
  }
};

// DELETE - Delete an author
export const deleteAuthor = async (req: Request, res: Response) => {
  try {
    const { authorID } = req.params;
    const deletedAuthor = await Author.findByIdAndDelete(authorID);

    if (deletedAuthor) {
      res.status(204).send(); 
    } else {
      res.status(404).json({ error: "Author not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting author" });
  }
};
