import bcrypt from "bcrypt";
import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../CustomError/CustomError.js";
import User from "../../database/models/User.js";
import { type UserDetailsStructure } from "../types.js";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find().exec();

    res.status(200).json({ users });
  } catch (error) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Couldn't retrieve users."
    );

    next(customError);
  }
};

export const registerUser = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    UserDetailsStructure
  >,
  res: Response,
  next: NextFunction
) => {
  const { username, password, email, about } = req.body;

  try {
    const avatar = req;

    const hashedPassword = await bcrypt.hash(password, 8);

    await User.create({
      username,
      password: hashedPassword,
      email,
      about,
      avatar,
    });

    res.status(201).json({ message: "User created succesfully " });
  } catch (error) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Couldn't register the user"
    );

    next(customError);
  }
};
