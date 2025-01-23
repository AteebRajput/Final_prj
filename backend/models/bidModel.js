import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  bidder: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productOwnerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const Bid = mongoose.model("Bid", bidSchema);
