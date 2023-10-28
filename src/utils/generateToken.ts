import jwt, { Secret } from "jsonwebtoken";
import { Response } from "express";

const generateToken = (res: Response, userId: string) => {
  const secret: Secret = process.env.JWT_SECRET || "defaultSecret";
  const token = jwt.sign({ userId }, secret, {
    expiresIn: "30d",
  });

  // Set JWT as HTTP-Only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateToken;
