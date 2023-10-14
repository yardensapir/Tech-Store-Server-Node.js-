import express from "express";
import * as categoryController from "../controllers/categoryController";
const router = express.Router();

router.get("/api/categories", categoryController.getCategories);
router.post("/api/categories", categoryController.createNewCategory);
router.delete("/api/categories/:id",categoryController.deleteCategory)

export default router;
 
//Cameras