import express from "express";
import { createAuctionController } from "../controller/auctionController.js";

const router = express.Router();

// POST route to create an auction
router.post("/create-auction", createAuctionController);

export default router;
