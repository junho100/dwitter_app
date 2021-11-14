import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import "express-validator";
import "express-async-errors";
import tweetRouter from "./router/tweet.js";
import authRouter from "./router/auth.js";
import config from "./config.js";
import { db } from "./db/database.js";
process.setMaxListeners(15);

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));

app.use("/tweets", tweetRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.sendStatus(500);
});

db.getConnection().then((connection) => {
  console.log(connection);
});

app.listen(config.host.port);
