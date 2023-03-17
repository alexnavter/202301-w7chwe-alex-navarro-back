// NUEVOS IMPORTS

import bcrypt from "bcrypt"; // <
import fs from "fs/promises"; // <
import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../CustomError/CustomError.js";
import User from "../../database/models/User.js";
import { type UserDetailsStructure } from "../types.js";
import path from "path"; // <
import { createClient } from "@supabase/supabase-js";

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

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;
const supabaseBucket = process.env.SUPABACE_BUCKET!;

const supabase = createClient(supabaseUrl, supabaseKey);

export const registerUser = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    UserDetailsStructure
  >,
  res: Response,
  next: NextFunction
) => {
  const userData = req.body;

  try {
    const imageName = req.file?.filename;

    const hashedPassword = await bcrypt.hash(userData.password, 8);

    const image = await fs.readFile(path.join("uploads", imageName!));

    await supabase.storage.from(supabaseBucket).upload(imageName!, image); // Aquí añadiriamos el control del cache

    const {
      data: { publicUrl },
    } = supabase.storage.from(supabaseBucket).getPublicUrl(imageName!);

    const user = await User.create({
      ...userData,
      password: hashedPassword,
      avatar: imageName,
      backupImage: publicUrl,
    });

    res.status(201).json({ user });
  } catch (error) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Couldn't register the user"
    );

    next(customError);
  }
};
