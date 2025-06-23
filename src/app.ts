import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";

import authorRoutes from "./routes/author.routes";
import bookRoutes from "./routes/book.routes";
import categoryRoutes from "./routes/category.routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Mount Routers
app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);
app.use("/categories", categoryRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    status: "fail",
    statusCode: 404,
    message: "Route not found",
  });
});
app.use(errorHandler);

export default app;
