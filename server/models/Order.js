import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    costumerName: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      max: 50,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    products: {
      type: Array,
      default: [],
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;