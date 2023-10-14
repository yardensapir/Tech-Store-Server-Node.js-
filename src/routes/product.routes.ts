import express from "express";
import * as productController from "../controllers/productController";

const router = express.Router();

router.get("/api/products", productController.getProducts);
router.get("/api/products/category/:categoryName", productController.getProducts);
router.get("/api/products/:id", productController.getProductById);


export default router;
