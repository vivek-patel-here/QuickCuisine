const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { validateSchema } = require("../middlewares/validateSchema.js");
const { loginLogic, signupLogic } = require("../controllers/UserController.js");
const { wrapAsync } = require("../middlewares/wrapAsync.js");

// new user register route
router.post(
  "/signup",
  [
    body("username", "Username must be atleast 2 character long string")
      .isString()
      .isLength({ min: 2, max: 30 }),
    body("email", "Please enter a valid Email").isEmail(),
    body("password", "Password must be atleast 8 character long")
      .isString()
      .isLength({ min: 8 }),
  ],
  validateSchema,
  wrapAsync(signupLogic)
);

//login route
router.post(
  "/login",
  [
    body("email", "Please enter a valid Email").isEmail(),
    body("password", "Password must be atleast 8 character long")
      .isString()
      .isLength({ min: 8 }),
  ],
  validateSchema,
  wrapAsync(loginLogic)
);

module.exports = router;
