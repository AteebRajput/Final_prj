// Instead of require, use import
import safeBuffer from 'safe-buffer';
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser';
import connectDB from "./db/connectDB.js";
import authRoute from "./routes/authRoute.js";
import productRouter from "./routes/productRoute.js";
import auctionRouter from "./routes/auctionRouter.js";
import bidRouter from "./routes/bidRoute.js";

// Rest of your code remains the same
// Rest of your code remains the same

// load enviroment variable
dotenv.config();

// creating an app
const app = express();


// connect to DB
connectDB();
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true,  // Allow cookies to be sent with requests
    methods: "GET,POST,PUT,DELETE", // Allow these methods
    allowedHeaders: "Content-Type,Authorization", // Allow headers for token authentication
  })
);

// middleware to parso json
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoute);
app.use("/api/product", productRouter);
app.use("/api/auction", auctionRouter);
app.use("/api/bid", bidRouter);

app.get("/", (req, res) => {
  res.send("Hello world");
});

const PORT = process.env.PORT || 5000;

console.log("Port number is:", process.env.PORT);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
