import { Router, Request, Response, NextFunction } from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoriesController";
const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  console.log("GETTING ALL CATEGORIES");
  next();
}, getAllCategories);

router.post("/", createCategory);
router.get("/:id", getCategoryById);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
