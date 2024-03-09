const { Router } = require("express");
const {
  getRegisterPage,
  registerUser,
  getLoginPage,
  loginUser,
  logOut,
} = require("../controllers/auth.controller");
const { guest } = require("../middlewares/protected");

const router = Router();

router.get("/register", guest, getRegisterPage);
router.post("/register", guest, registerUser);
router.get("/login", guest, getLoginPage);
router.post("/login", guest, loginUser);
router.get("/logout", logOut);

module.exports = router;
