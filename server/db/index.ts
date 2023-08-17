import mongoose from "mongoose";

//Admin
const adminSchema = new mongoose.Schema({
  fullname: String,
  username: String,
  password: String,
});

//User
const userSchema = new mongoose.Schema({
  fullname: String,
  phone: String,
  username: String,
  password: String,
  address: String,
  purchasedProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  wishlistProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

//Product
const productSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  category: String,
  title: String,
  description: String,
  imageUrl: String,
  quantity: Number,
  adminId: String,
});

export const Admin = mongoose.model("admins", adminSchema);
export const User = mongoose.model("users", userSchema);
export const Product = mongoose.model("products", productSchema);
