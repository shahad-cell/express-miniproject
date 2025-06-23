import { Router, Request, Response, NextFunction } from "express";
import {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "../controllers/authorController";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  console.log("GETTING ALL AUTHORS");
  next();
}, getAllAuthors);

router.post("/", createAuthor);
router.get("/:authorID", getAuthorById);
router.put("/:authorID", updateAuthor);
router.delete("/:authorID", deleteAuthor);

export default router;
