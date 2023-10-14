import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./database/db";
import productRouter from "./routes/product.routes";
import categoriesRouter from './routes/category.routes'
import userRouter from './routes/user.routes'
import adminRouter from './routes/admin.routes'
dotenv.config();


const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());


// Routes
app.use(productRouter);
app.use(categoriesRouter)
app.use(userRouter)
app.use(adminRouter)


// Connect To Server
app.listen(PORT, () => {
  connectDB();
  console.log(`REST API server ready at: http://localhost:${PORT}`);
});
