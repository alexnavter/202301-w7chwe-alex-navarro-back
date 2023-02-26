import { Router } from "express";
import {
  getUsers,
  registerUser,
} from "../server/controllers/userControllers.js";
import multer from "multer";

export const usersRouter = Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename(req, file, callBack) {
    callBack(null, file.originalname);
  },
});

const upload = multer({ storage });

usersRouter.get("/users", getUsers);
usersRouter.post("/register", upload.single("avatar"), registerUser);
