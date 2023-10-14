import express from "express";

import * as userControllers from "../controllers/userControllers";

const router = express.Router();

router.get("/api/users", userControllers.getUsers);
router.get("/api/users/:id", userControllers.getUsersById);
router.delete("/api/users/:id",userControllers.deleteUser)
router.put("/api/users/:id",userControllers.updateUser)


export default router