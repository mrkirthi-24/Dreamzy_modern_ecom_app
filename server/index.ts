import express from "express";
import mongoose from "mongoose";
import adminRoute from "./routes/admin";
import userRoute from "./routes/user";
import cors from "cors";
import dotenv from "dotenv";
const PORT = 3000;

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

//Routes
app.use("/admin", adminRoute);
app.use("/user", userRoute);


if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL variable is not defined.");
}

mongoose.connect(process.env.DATABASE_URL, {
  dbName: "Ecommerce_App",
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

app.listen(PORT, () => {
  try {
    console.log("Server Running on PORT: " + PORT);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error starting server:", error.message);
    }
  }
});
