const express = require("express");
const helmet = require("helmet");

const userRouter = require("../users/users-router");
const authRouter = require("../auth/authRouter");

const server = express();

server.use(express.json());
server.use(helmet());

server.get("/", (req, res) => {
  res.status(200).json({ message: "api running" });
});

server.use("/api/users", userRouter);
server.use("/api/auth", authRouter);

module.exports = server;
