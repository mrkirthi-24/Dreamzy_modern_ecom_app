import express from "express";
import mongoose from "mongoose";
import adminRoute from "./routes/admin";
import userRoute from "./routes/user";
import cors from "cors";
const PORT = 3000;

const app = express();

app.use(express.json());
app.use(cors());

//Routes
app.use("/admin", adminRoute);
app.use("/user", userRoute);

mongoose.connect("mongodb://localhost:27017/Ecommerce_App", {
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
