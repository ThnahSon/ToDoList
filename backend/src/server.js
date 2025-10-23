import express from "express";
import taskRoute from "./routes/taskRouters.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();
//middleware
app.use(express.json());
app.use(cors({origin: "http://localhost:5173"}));


app.use("/api/tasks", taskRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server bắt đầu trên cổng ${PORT}");
  });
}).catch((error) => {
  console.error("Lỗi kết nối database:", error);
});