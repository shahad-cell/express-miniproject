import { Router, Request, Response, NextFunction } from "express";
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController";
import upload from "../middlewares/upload";

const router = Router();

// GET all books
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  console.log("GETTING ALL BOOKS");
  next();
}, getAllBooks);

// POST book with file upload (cover image)
router.post("/", upload.single("coverImage"), createBook);

// Other CRUD routes
router.get("/:id", getBookById);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
