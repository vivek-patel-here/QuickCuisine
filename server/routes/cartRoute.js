const express = require("express");
let router = express.Router();
const { wrapAsync } = require("../middlewares/wrapAsync.js");
const {
  addToCart,
  removeFromCart,
  getCartItems
} = require("../controllers/CartController.js");

//view cart item
router.get("/",wrapAsync(getCartItems));

//End point to add an item to cart of authenticated user
router.post("/", wrapAsync(addToCart));

//End point to remove an item to cart of authenticated user
router.delete("/", wrapAsync(removeFromCart));


module.exports =router;
