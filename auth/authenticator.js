module.exports = (req, res, next) => {
  console.log(req.session);

  if (req.session.loggedIn) {
    next();
  } else {
    res.status(401).json({ message: "sorry, you're not logged in" });
  }
};
