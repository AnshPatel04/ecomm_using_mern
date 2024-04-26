//   costumerName: ,
//   address: ,
//   email: ,
//   phoneNumber: ,
//   products: ,
//   totalAmount: ,
//   userId: ,.
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import Order from "../models/Order.js";

/* REGISTER ORDER */
export const register = async (req, res) => {
    try {
    //   console.log(req.body);
      const {
        costumerName,
        address,
        email,
        phoneNumber,
        products,
        totalAmount,
        userId
      } = req.body;
  
      const newOrder = new Order({
        costumerName,
        address,
        email,
        phoneNumber,
        products,
        totalAmount,
        userId
      });
      const savedOrder = await newOrder.save();
      res.status(201).json(savedOrder);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  export const getOrders = async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };