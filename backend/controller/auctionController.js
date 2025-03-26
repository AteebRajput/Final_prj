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

// Controller methods
export const getFarmerAuctionsController = async (req, res) => {
  try {
    const { userId } = req.query; // Extract userId from query parameters
    // console.log('Fetch request is made', userId);

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const auctions = await Auction.find({ ownerId: userId })
      .populate('productId', 'name')
      .populate('highestBid.bidder', 'name')
      .lean();

    const formattedAuctions = auctions.map(auction => ({
      id: auction._id,
      productName: auction.productId ? auction.productId.name : 'Unknown Product', // Handle null productId
      basePrice: auction.basePrice,
      highestBid: auction.highestBid,
      bidderCount: auction.bidders ? auction.bidders.length : 0, // Handle missing bidders array
      startTime: auction.startTime,
      endTime: auction.endTime,
      status: auction.status,
    }));

    res.status(200).json(formattedAuctions);
  } catch (error) {
    console.error('Error fetching farmer auctions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAuctionBidsController = async (req, res) => {
  try {
    const { auctionId } = req.params;

    const auction = await Auction.findById(auctionId)
      .populate({
        path: 'bidders.bidder',
        select: 'name'
      });

    if (!auction) {
      return res.status(404).json({ error: "Auction not found" });
    }
    // console.log("These are the functions:",auction);
    
    res.status(200).json(auction.bidders);
  } catch (error) {
    console.error('Error fetching auction bids:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const endAuctionController = async (req, res) => {
  try {
    const { auctionId } = req.params;
    const { farmerId } = req.body;

    const auction = await Auction.findOne({ 
      _id: auctionId, 
      ownerId: farmerId, 
      status: "active" 
    });

    if (!auction) {
      return res.status(404).json({ error: "Active auction not found" });
    }

    // Automatically end auction if time has passed
    if (new Date() > auction.endTime) {
      auction.status = "ended";
      
      if (auction.highestBid) {
        // Create an order for the winning bid
        const order = new Order({
          productId: auction.productId,
          buyerId: auction.highestBid.bidder,
          sellerId: auction.ownerId,
          amount: auction.highestBid.amount,
          status: 'completed'
        });

        await order.save();
        
        // Optional: Remove product from active listings
        await Product.findByIdAndUpdate(auction.productId, { 
          status: 'sold', 
          upForAuction: false 
        });
      }

      await auction.save();

      return res.status(200).json({ 
        message: "Auction ended successfully", 
        winner: auction.highestBid?.bidder || null 
      });
    }

    return res.status(400).json({ error: "Auction time has not yet ended" });
  } catch (error) {
    console.error("Error ending auction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Fetch auction details for a specific product
export const getAuctionDetails = async (req, res) => {
  const { productId } = req.params;
  
  try {
    const auction = await Auction.findOne({ "productId":productId }).populate('highestBid.bidder bidders.bidder'); // Populate bidder data

    if (!auction) {
      return res.status(404).json({ message: 'Auction not found or auction has ended.' });
    }

    // Calculate highest bid (if any)
    const highestBid = auction.highestBid.amount;

    // Calculate total bidders (length of bidders array)
    const totalBidders = auction.bidders.length;

    // Calculate remaining time
    const remainingTime = new Date(auction.endTime) - new Date();
    const formattedRemainingTime = remainingTime > 0 ? remainingTime : 0; // Remaining time in milliseconds

    res.json({
      highestBid,
      totalBidders,
      remainingTime: formattedRemainingTime, // Return remaining time in ms
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching auction details.', error: error.message });
  }
};
