import crypto from "crypto";
import path from "path";
import { Router } from "express";
import {
  getUsers,
  registerUser,
} from "../server/controllers/userControllers.js";
import multer from "multer";

export const usersRouter = Router();

// DEMO
const storage = multer.diskStorage({
  destination: "uploads/",
  filename(req, file, callback) {
    const suffix = crypto.randomUUID();
    const extension = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extension);
    const filename = `${basename}-${suffix}${extension}`;

    callback(null, filename);
  },
});

const upload = multer({ storage });

usersRouter.get("/all-users", getUsers);
usersRouter.post("/register", upload.single("avatar"), registerUser);
