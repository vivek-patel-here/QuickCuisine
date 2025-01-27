const { User } = require("../models/User");

//add to cart
const addToCart = async (req, res) => {
  let { id } = req.user;
  let { item_id } = req.body;
  let user = await User.findById(id);
  let cartData = await user.cartData;
  if (!cartData[item_id]>0) {
    cartData[item_id] = 1;
  } else {
    cartData[item_id] += 1;
  }
  await User.findByIdAndUpdate(id, { cartData });
  res.status(200).json({ success: true, message: "Added to Cart" });
};


//remove from cart
const removeFromCart = async(req, res) => {
    const {id} =req.user;
    const {item_id} =req.body;
    let user =await User.findById(id);
    let cartData = await user.cartData;
    if(cartData[item_id]){
      cartData[item_id]--;
    }
    await User.findByIdAndUpdate(id,{cartData});
    res.status(200).json({success:true,message:"Item removed from cart"})
  
  };

  // see all cart items
const getCartItems =async(req, res) => {
    const {id}=req.user;
    let user = await User.findById(id);
    let cartData =await user.cartData ;
    res.status(200).json({success:true,message:"Cart data has Fetched!",cartData});
}

module.exports = { addToCart ,removeFromCart,getCartItems};
