const express =require("express");
const router =express.Router();
const upload = require("../Configs/multerSetup.js");
const {addfood,seeAllFood,removeFoodListing} =require("../controllers/FoodController.js")
const {wrapAsync} =require("../middlewares/wrapAsync.js")


//EndPoint1 : To add new food
router.post("/newfood",upload.single("image"),addfood)

//EndPoint2: To see all the food listing
router.get("/all",wrapAsync(seeAllFood))

//EndPoint 3: To remove a specific food listing
router.delete("/",wrapAsync(removeFoodListing))



module.exports =router;