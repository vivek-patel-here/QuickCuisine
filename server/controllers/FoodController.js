const { Food } = require("../models/Food.js");
const upload = require("../Configs/multerSetup.js");
const cloudinary = require("../Configs/cloudConfig.js");

//add new listing logic
const addfood = async (req, res) => {
  try {
    let newfood = new Food({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.file.path,
      imagePublicId: req.file.filename,
      category: req.body.category,
    });
    await newfood.save();
    res
      .status(200)
      .json({ success: true, message: "Food added successfully!" });
  } catch (err) {
    if (req.file) {
      await cloudinary.uploader.destroy(req.file.filename);
    }
    res
      .status(400)
      .json({ sucess: false, message: "Unable to add the food listing!" });
  }
};

//see all listing logic
const seeAllFood = async (req, res) => {
  let allFood = await Food.find();
  if (!allFood.length) {
    return res
      .status(400)
      .json({ success: false, message: "No listing Found" });
  }
  res.status(200).json({
    success: true,
    message: "Data fetched successfully!",
    foodList: allFood,
  });
};

//remove an existing specific listing
const removeFoodListing = async (req, res) => {
  let { id } = req.body;
  let deletedFood = await Food.findByIdAndDelete(id);
  if (!deletedFood) {
    return res.status(400).json({
      success: false,
      message:
        "Unable to delete. This may be due to the item not existing or an incorrect ID provided.",
    });
  }
  await cloudinary.uploader.destroy(deletedFood.imagePublicId);
  res
    .status(200)
    .json({ success: true, message: "Listing has deleted successfully!" });
};

module.exports = { addfood, seeAllFood, removeFoodListing };
