import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";

import mongoose from "mongoose";
import dotenv from "dotenv";

import cors from "cors";

import userRouter from "./routes/userRouter.mjs";
import adminRouter from "./routes/adminRouter.mjs";

const app = express();

app.use(cors({ origin: true }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Mongoose connection.............
dotenv.config({ path: "./config.env" });
const db = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection
  .once("open", () => console.log("database connected successfully"))
  .on("error", (error) => {
    console.log("error: ", error);
  });

app.use(function (req, res, next) {
  res.header(
    "Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  next();
});

app.use("/", userRouter);
app.use("/admin", adminRouter);

app.listen(3000, () => {
  console.log("server started");
});
