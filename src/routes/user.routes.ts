import express from "express";
import * as userControllers from '../controllers/userControllers'

const router = express.Router();

router.post("/api/users", userControllers.registerUser);
router.post("/api/users/login",userControllers.authUser)
router.post("/api/users/logout",userControllers.logoutUser)
router.get("/api/users/profile",userControllers.getUserProfile)
router.put("/api/users/profile",userControllers.updateUserProfile)


export default router