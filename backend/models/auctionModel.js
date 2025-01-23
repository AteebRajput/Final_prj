import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date, required: true },
  basePrice: { type:Number,required:true},
  highestBid: { 
    bidder: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    amount: { type: Number, default: 0 },
  },
  bidders: [
    {
      bidder: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      amount: { type: Number },
    },
  ],
  status: { type: String, enum: ["active", "ended"], default: "active" },
});

const Auction = mongoose.model("Auction", auctionSchema);
export default Auction;
