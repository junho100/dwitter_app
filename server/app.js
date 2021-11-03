import express from "express";
import morgan from "morgan";
import tweetRouter from "./router/tweet.js";

const app = express();
app.use(morgan("combined"));

app.use("/tweets", tweetRouter);

app.listen(8080);
