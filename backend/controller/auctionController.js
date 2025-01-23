import Auction from "../models/auctionModel.js";
import Product from "../models/productModel.js";

export const createAuctionController = async (req, res) => {
  try {
    const { productId, bidDuration } = req.body;

    // Validate input
    if (!productId || !bidDuration || !["hours", "days"].includes(bidDuration.unit) || isNaN(bidDuration.value)) {
      return res.status(400).json({ error: "Invalid input for auction creation" });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const currentTime = new Date();
    
    const endTime =
      bidDuration.unit === "hours"
        ? new Date(currentTime.getTime() + bidDuration.value * 60 * 60 * 1000)
        : new Date(currentTime.getTime() + bidDuration.value * 24 * 60 * 60 * 1000);

    const auction = new Auction({
      productId,
      ownerId: product.seller,
      basePrice: product.basePrice,
      endTime,
    });

    await auction.save();

    res.status(201).json({ message: "Auction created successfully", auction });
  } catch (error) {
    console.error("Error creating auction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
