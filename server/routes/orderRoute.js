const express = require("express");
const router = express.Router({mergeParams:true});
const { placeOrder, userOrder ,fetchPendingOrders,updateStatus,paymentSuccess} = require("../controllers/orderController");
const { wrapAsync } = require("../middlewares/wrapAsync.js");
const {isAuthenticated} =require("../middlewares/isAuthenticated.js")


//end point to fetch all the orders
router.get("/",isAuthenticated,wrapAsync(userOrder));

//end point to add a new order
router.post("/",isAuthenticated,wrapAsync(placeOrder));

//end point to fetch all the orders
router.get("/all",wrapAsync(fetchPendingOrders))

router.patch("/",wrapAsync(updateStatus))

router.patch("/paymentsuccess",isAuthenticated,wrapAsync(paymentSuccess))

module.exports = router;
 

