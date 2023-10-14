import { Request, Response } from "express";

export const registerUser = async (req: Request, res: Response) => {res.send("Register")};

export const authUser = async (req: Request, res: Response) => {res.send("Login")};

export const logoutUser = async (req: Request, res: Response) => {res.send("logout")};

export const getUserProfile = async (req: Request, res: Response) => {};

export const updateUserProfile = async (req: Request, res: Response) => {};

export const getUsers = async (req: Request, res: Response) => {};

export const getUsersById = async (req: Request, res: Response) => {};

export const deleteUser = async (req: Request, res: Response) => {};

export const updateUser = async (req: Request, res: Response) => {};
