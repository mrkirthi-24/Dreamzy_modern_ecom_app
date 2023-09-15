import { z } from "zod";

// Admin Schema and Type
const adminSchema = z.object({
  fullname: z.string().max(50).optional(),
  username: z.string().email().min(5).max(25),
  password: z.string().min(6).max(150),
});

type AdminType = z.infer<typeof adminSchema>;

// User Schema and Type
const userSchema = z.object({
  fullname: z.string().optional(),
  phone: z.string().min(1).max(10),
  username: z.string().email().min(5).max(25),
  password: z.string().min(6).max(150),
  address: z.string().max(250).optional(),
  purchasedProducts: z.array(z.string()).optional(),
  wishlistProducts: z.array(z.string()).optional(),
});

type UserType = z.infer<typeof userSchema>;

// Product Schema and Type
const productSchema = z.object({
  category: z.string().min(3).max(20),
  title: z.string().min(5).max(50),
  description: z.string().max(100).optional(),
  imageUrl: z.string(),
  mrp: z.number().min(1).max(6),
  sell: z.number().min(1).max(7),
  quantity: z.number().max(4),
});

type ProductType = z.infer<typeof productSchema>;

export { adminSchema, userSchema, productSchema, AdminType, UserType, ProductType };
