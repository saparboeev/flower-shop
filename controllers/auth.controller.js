const db = require("../models/index.model");
User = db.users;

// Description -------- Register Page
// Method -------- GET
// Access -------- Public

const getRegisterPage = (req, res) => {
  try {
    res.render("auth/register", {
      title: "Register",
      error: req.flash("error"),
    });
  } catch (error) {
    console.log(error);
  }
};

// Description -------- Register New Users
// Method -------- POST
// Access -------- Public

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, password2 } = req.body;

    const user = await User.findOne({ where: { email: email } });

    if (firstName == "" || lastName == "" || email == "" || password == "") {
      req.flash("error", "The space cannot be left empty!");

      return res.redirect("/auth/register");
    } else if (user) {
      req.flash(
        "error",
        "The user with such email is already available in our system"
      );

      return res.redirect("/auth/register");
    } else if (!(password == password2)) {
      req.flash("error", "Your password does not match");
      return res.redirect("/auth/register");
    } else if (password.length < 7) {
      req.flash("error", "Your password must be at least 7 characters");
      return res.redirect("/auth/register");
    } else {
      await User.create({
        firstName,
        lastName,
        email,
        password,
      });

      return res.redirect("/auth/login");
    }
  } catch (error) {
    console.log(error);
  }
};

// Description -------- Login Page
// Method -------- GET
// Access -------- Public

const getLoginPage = (req, res) => {
  try {
    const isAuthenticated = req.session.isLogged;
    res.render("auth/login", {
      title: "Login",
      isAuthenticated,
      error: req.flash("error"),
    });
  } catch (error) {
    console.log(error);
  }
};

// Description -------- Login Users
// Method -------- POST
// Access -------- Public

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (req.body.email == "" || req.body.password == "") {
      req.flash("error", "The field cannot be left empty!");

      return res.redirect("/auth/login");
    } else if (!user) {
      req.flash("error", "Cannot find such a user!");
      res.redirect("/auth/login");
    } else if (
      !(user.email == req.body.email && user.password == req.body.password)
    ) {
      req.flash("error", "Your email or password is incorrect!");
      return res.redirect("/auth/login");
    } else {
      req.session.isLogged = true;
      return res.redirect("/flowers");
    }

    return res.end("You password is incorrect");
  } catch (error) {
    console.log(error);
  }
};

// Description -------- Log Out from Dashboard
// Method -------- POST
// Access -------- Private

const logOut = async (req, res) => {
  try {
    req.session.destroy(() => {
      return res.redirect("/auth/login");
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getRegisterPage,
  registerUser,
  getLoginPage,
  loginUser,
  logOut,
};
