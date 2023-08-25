//tasks
//authentication signup login
//products create get edit

import express, { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { Admin, Product } from "../db";
import { authenticateJWT, SECRET_KEY } from "../middleware";
import { adminDetails, productDetails } from "./types";

const router: Router = Router();

//SignUp Admin
router.post("/signup", async (req: Request, res: Response) => {
  const { username }: adminDetails = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin) {
    const newAdmin = new Admin(req.body);
    newAdmin.save();
    const token = jwt.sign({ id: newAdmin._id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ message: "Admin created successfully", token });
  } else return res.status(400).json({ message: "Admin already exists" });
});

//Login Admin
router.post("/login", async (req: Request, res: Response) => {
  const { username, password }: adminDetails = req.body;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ id: admin._id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ message: "Admin LoggedIn successfully", token });
  } else
    return res.status(403).json({ message: "Invalid username or password" });
});

//Create Product
router.post(
  "/createproduct",
  authenticateJWT,
  async (req: Request, res: Response) => {
    try {
      const {
        category,
        title,
        description,
        imageUrl,
        quantity,
      }: productDetails = req.body;
      const adminId = req.headers["authId"];
      const newProduct = new Product({
        category,
        title,
        description,
        imageUrl,
        quantity,
        adminId,
      });
      const savedProd = await newProduct.save();
      res.status(200).json(savedProd);
    } catch (error) {
      console.error("Error saving product:", error);
      res.status(500).json({ error: "Failed to create a new product" });
    }
  }
);

//Get Product
router.get("/products", authenticateJWT, (req: Request, res: Response) => {
  const adminId = req.headers["authId"];
  Product.find({ adminId })
    .then((products) => {
      res.status(200).json(products);
    })
    .catch(() => {
      res.status(500).json({ error: "Failed to retrieve products" });
    });
});

//Edit Product
router.put("/product/:id", authenticateJWT, (req: Request, res: Response) => {
  const productId = req.params.id;
  const adminId = req.headers["authId"];
  const newProduct = req.body;
  Product.findOneAndUpdate({ _id: productId, adminId }, newProduct, {
    new: true,
  })
    .then((updatedProduct) => {
      res.status(200).json(updatedProduct);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: `Failed to update product with id: ${productId}` });
    });
});

//Delete product
router.delete(
  "/product/:productId",
  authenticateJWT,
  (req: Request, res: Response) => {
    const productId = req.params.productId;
    const adminId = req.headers["authId"];
    Product.findOneAndDelete({ _id: productId, adminId })
      .then(() => {
        res.status(200).json({ message: "Product deleted successfully" });
      })
      .catch((error) => res.status(500).json({ error: error.message }));
  }
);

export default router;
