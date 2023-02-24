import "./loadEnvironment.js";
import morgan from "morgan";
import express from "express";
import cors from "cors";
import connectDataBase from "./database/connectDatabase.js";
import chalk from "chalk";
import debug from "debug";
import startServer from "./server/startServer.js";
import mongoose from "mongoose";

export const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use(cors());

const port = process.env.PORT ?? 4000;
const mongoDdUrl = process.env.MONGODB_CONNECTION_URL;

mongoose.set("toJSON", {
  virtuals: true,
  transform(doc, ret) {
    delete ret._id;
    delete ret.__v;
  },
});

try {
  await connectDataBase(mongoDdUrl!);
  debug(chalk.green("Connected to data base"));

  await startServer(+port);
  debug(chalk.green(`Server listening on port ${port}`));
} catch (error) {
  debug((error as Error).message);
}
