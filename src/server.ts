import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI || "", {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(` Connected to MongoDB: ${connection.connection.name}`);
  } catch (error) {
    console.error(" MongoDB connection error:", error);
  }
};

connectDB();

app.listen(5500, () => {
  console.log(" Server is running on Port 5500");
});
