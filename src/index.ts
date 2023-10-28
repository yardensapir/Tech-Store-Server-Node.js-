import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./database/db";
import productRouter from "./routes/product.routes";
import categoriesRouter from "./routes/category.routes";
import userRouter from "./routes/user.routes";
import adminRouter from "./routes/admin.routes";
import { notFound, errorHandler } from "./middleware/errorHandler";
import cookieParser from 'cookie-parser'
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Cookie parser middleware
app.use(cookieParser())

// Routes
app.use(productRouter);
app.use(categoriesRouter);
app.use(userRouter);
app.use(adminRouter);
app.use(notFound)
app.use(errorHandler)

// Connect To Server
app.listen(PORT, () => {
  connectDB();
  console.log(`REST API server ready at: http://localhost:${PORT}`);
});
