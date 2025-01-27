const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderBy:{
    type:String,
    required:true
  },
  PhoneNum:{
    type:Number,
    required:true
  },
  userId: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    rqeuired: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  address: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    default: "Food Processing",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  paymentStatus: {
    type: Boolean,
    default: false,
  }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order };
