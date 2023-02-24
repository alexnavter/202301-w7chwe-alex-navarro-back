import "./loadEnvironment.js";
import morgan from "morgan";
import express from "express";
import cors from "cors";

export const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use(cors());
