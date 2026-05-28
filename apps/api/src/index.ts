import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.routes";
import adminRoute from "./routes/admin.routes";
import { FRONTEND_URL } from "./config/env";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser()); 

// Middlewares
app.use(cors({ origin: FRONTEND_URL, credentials: true }));

app.use(express.json());

// -----------------------------
// Routes
// -----------------------------
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Portfolio Turbo API is up and shining 🌸 🚀" });
});

const PORT = 5500;

// 🚀 Launching the server like a queen
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`); // 💻 My backend is officially slaying
});