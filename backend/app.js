import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();

// database
import connectDB from "./utils/db.js";

// middleware
import { ErrorMiddleware } from "./middlewares/error.js";

const app = express();
const PORT = process.env.PORT || 5001;

// HTTP logger
app.use(morgan("dev"));

// Body parser
app.use(express.urlencoded({ extended: true }));

// Port listening
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
  connectDB();
});

// API testing
app.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

// Unknown route
app.all("/{*any}", (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`);
  err.statusCode = 404;
  next(err);
});

app.use(ErrorMiddleware);
