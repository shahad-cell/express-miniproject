import { Request, Response } from "express";
import Category from "../models/Categories";

// GET - Get all categories
const getAllCategories = async (req: Request, res: Response) => {
  try {
    const allCategories = await Category.find();
    res.json(allCategories);
  } catch (error) {
    res.status(404).json({
      status: "Failed",
      error: `Categories not found: ${error}`,
    });
  }
};

// GET - Get a single category
const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { categoryID } = req.params;
    const foundCategory = await Category.findById(categoryID);

    if (foundCategory) {
      res.json(foundCategory);
    } else {
      res.status(404).json("Category Not Found");
    }
  } catch (error) {
    res.status(404).json({ error: "Error retrieving category" });
  }
};

// POST - Create a new category
const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const newCategory = await Category.create({ name });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: "Error creating category" });
  }
};

// PUT - Update a category
const updateCategory = async (req: Request, res: Response) => {
  try {
    const { categoryID } = req.params;
    const { name } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryID,
      { name },
      { new: true }
    );

    if (updatedCategory) {
      res.json(updatedCategory);
    } else {
      res.status(404).json("Category not found");
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating category" });
  }
};

// DELETE - Delete a category
const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { categoryID } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(categoryID);

    if (deletedCategory) {
      res.status(204).json({
        status: "Success",
        message: "Category is deleted successfully.",
      });
    } else {
      res.status(404).json({ error: "Category not found." });
    }
  } catch (error) {
    res.status(404).json({
      status: "Failed",
      error: `Category not found: ${error}`,
    });
  }
};

export {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
