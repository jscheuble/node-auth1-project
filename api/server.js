const express = require("express");
const helmet = require("helmet");
const session = require("express-session");
const cors = require("cors");

const userRouter = require("../users/users-router");
const authRouter = require("../auth/authRouter");
const authenticator = require("../auth/authenticator");

const server = express();

const sessionConfig = {
  name: "cookie",
  secret: process.env.SESSION_SECRET || "secret",
  resave: false,
  saveUninitialized: process.env.SEND_COOKIES || true,
  cookie: {
    maxAge: 1000 * 60 * 1, // 1 minute
    secure: process.env.SECURE_COOKIES || false,
    httpOnly: true,
  },
};

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(session(sessionConfig));

server.get("/", (req, res) => {
  res.status(200).json({ message: "api running" });
});

server.use("/api/users", authenticator, userRouter);
server.use("/api/auth", authRouter);

module.exports = server;
