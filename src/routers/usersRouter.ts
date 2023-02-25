import { Router } from "express";
import { getUsers } from "../server/controllers/userControllers.js";

export const usersRouter = Router();

usersRouter.get("/users", getUsers);
