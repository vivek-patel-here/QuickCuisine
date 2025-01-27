const { validationResult } = require("express-validator");

const validateSchema = (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ success: false, message: errors.errors[0].msg});
  }
  next();
};

module.exports = { validateSchema };
