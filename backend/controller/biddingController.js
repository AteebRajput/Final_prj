import Auction from "../models/auctionModel.js";
import  { Bid } from "../models/bidModel.js";

export const placeBidController = async (req, res) => {
  try {
    const { auctionId, bidderId, bidAmount } = req.body;

    if (!auctionId || !bidderId || isNaN(bidAmount) || bidAmount <= 0) {
      return res.status(400).json({ error: "Invalid input for bid" });
    }

    const auction = await Auction.findById(auctionId).populate("highestBid.bidder").populate("bidders.bidder");
    if (!auction) return res.status(404).json({ error: "Auction not found" });

    if (auction.status !== "active") return res.status(400).json({ error: "Auction is not active" });

    if (bidAmount <= auction.highestBid.amount) {
      return res.status(400).json({ error: "Bid amount must be higher than the current highest bid" });
    }

    // Update auction
    auction.highestBid = { bidder: bidderId, amount: bidAmount };
    auction.bidders.push({ bidder: bidderId, amount: bidAmount });
    await auction.save();

    const bid = new Bid({
        bidder: bidderId,
        productId: auction.productId,
        productOwnerId: auction.ownerId,
        amount:bidAmount,
    })

    await bid.save()

    // Notify owner and bidders (logic for notification should go here)
    console.log("Notify owner:", auction.ownerId);
    console.log("Notify bidders:", auction.bidders);

    res.status(200).json({ message: "Bid placed successfully", auction });
  } catch (error) {
    console.error("Error placing bid:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
