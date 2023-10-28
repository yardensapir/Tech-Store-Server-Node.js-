import express from "express";
import * as userControllers from "../controllers/userControllers";
import { admin, protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/api/users", protect, admin, userControllers.getUsers);
router
  .route("/api/users/:id")
  .delete(protect, admin, userControllers.deleteUser)
  .get(protect, admin, userControllers.getUsersById)
  .put(protect, admin, userControllers.updateUser);

export default router;
