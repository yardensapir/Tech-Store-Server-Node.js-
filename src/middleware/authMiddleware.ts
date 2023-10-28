import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler";
import UserModel from "../models/userModel";
import { Request, Response, NextFunction } from "express";
import { Secret, JwtPayload } from "jsonwebtoken";

// Define a custom type for Request to include the 'user' property
declare global {
  namespace Express {
    interface Request {
      user: any; // You can specify the actual type of 'user' if needed
    }
  }
}

// Protect routes
export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;
    token = req.cookies.jwt;
    const secret: Secret = process.env.JWT_SECRET || "defaultSecret";

    if (!token) {
      res.status(401);
      return next(new Error("Not authorized, no token"));
    }

    try {
      const decoded: JwtPayload = jwt.verify(token, secret) as JwtPayload;

      if (!decoded || typeof decoded !== "object" || !("userId" in decoded)) {
        res.status(401);
        return next(new Error("Not authorized, token format invalid"));
      }

      const user = await UserModel.findById(decoded.userId).select("-password");

      //   if (!user) {
      //     res.status(401);
      //     return next(new Error("Not authorized, user not found"));
      //   }

      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      return next(new Error("Not authorized, token failed"));
    }
  }
);

export const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};
