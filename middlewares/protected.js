const protected = (req, res, next) => {
  if (!req.session.isLogged) {
    return res.redirect("/auth/login");
  }
  next();
};

const guest = (req, res, next) => {
  if (req.session.isLogged) {
    return res.redirect("/flower");
  }
  next();
};

module.exports = {
  protected,
  guest,
};
