const { Order } = require("../models/Order.js");
const { User } = require("../models/User.js");
const { Food } = require("../models/Food.js");
const { Cashfree } = require("cashfree-pg");

Cashfree.XClientId = process.env.CASHFREE_API_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;



const placeOrder = async (req, res) => {
  let { amount, address, orderBy, PhoneNum } = req.body;
  let { id } = req.user;
  let user = await User.findById(id);
  let items = [];
  const cartData = await user.cartData;

  for (let fid in cartData) {
    if (cartData[fid] > 0) {
      let food = await Food.findById(fid);
      let { _id, name, image, price, category } = food;
      let itemElement = {
        _id,
        name,
        image,
        price,
        category,
        quantity: cartData[fid],
      };
      items.push(itemElement);
    }
  }
  let newOrder = new Order({
    orderBy,
    PhoneNum,
    userId: id,
    items,
    amount,
    address,
  });
  await newOrder.save();
  let userdata = await User.findByIdAndUpdate(id, { cartData: {} });

  const request = {
    order_amount: amount*86,
    order_currency: "INR",
    customer_details: {
      customer_id: userdata._id,
      customer_name: orderBy,
      customer_email: userdata.email,
      customer_phone: PhoneNum.toString(),
    },
    order_meta: {
      return_url: `http://localhost:5173/verify?success=true&orderId=${newOrder._id}`,
    },
    order_note: "",
  };

  let paystat = await Cashfree.PGCreateOrder("2023-08-01", request);
  res
    .status(200)
    .json({
      success: true,
      payment_session_id: paystat.data.payment_session_id,
      paymentId: paystat.data.order_id,
    });
};

const userOrder = async (req, res) => {
  let { id } = req.user;
  let orders = await Order.find({ userId: id });
  res.status(200).json({
    success: true,
    message: "Order fetched successfully!",
    orders,
  });
};

const fetchPendingOrders = async (req, res) => {
  let orders = await Order.find();
  res.status(200).json({
    success: true,
    message: "Order fetched successfully!",
    orders,
  });
};

const updateStatus = async (req, res) => {
  let { id, status } = req.body;
  let updatedOrder = await Order.findByIdAndUpdate(id, { status });
  if (!updatedOrder) {
    return res.status(400).json({
      success: false,
      message: "Unable to update the status at this moment!",
    });
  }
  res
    .status(200)
    .json({ success: true, message: "Order status updated successFully!" });
};

const paymentSuccess = async (req, res) => {
  const {orderId} =req.body;
  await Order.findByIdAndUpdate(orderId, { paymentStatus: true });
  res
    .status(200)
    .json({ success: true, message: "Payment completed successfully!" });
};

module.exports = {
  placeOrder,
  userOrder,
  fetchPendingOrders,
  updateStatus,
  paymentSuccess,
};
