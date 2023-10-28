import express from "express";
import * as userControllers from '../controllers/userControllers'
import { admin, protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/api/users/register", userControllers.registerUser);
router.post("/api/users/auth",userControllers.authUser)
router.post("/api/users/logout",userControllers.logoutUser)
router.route("/api/users/profile").get(protect,userControllers.getUserProfile).put(protect,userControllers.updateUserProfile)
router.route("/api/users/:userId").delete(userControllers.deleteUser).get(userControllers.getUsersById).put(userControllers.updateUser)

export default router