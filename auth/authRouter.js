const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

const Users = require("../users/users-model");

router.post("/register", (req, res) => {
  let user = req.body;
  const rounds = process.env.HASH_ROUNDS || 9;

  const hash = bcrypt.hashSync(user.password, rounds);
  user.password = hash;

  Users.add(user)
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "unable to create user", err });
    });
});

router.post("/login", (req, res) => {
  Users.getBy(req.body.username)
    .then((user) => {
      if (user && bcrypt.compareSync(req.body.password, user[0].password)) {
        res.status(200).json({ message: `welcome ${req.body.username}` });
      } else {
        res.status(401).json({ error: "unable to authenticate " });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
