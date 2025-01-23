import Product from "../models/productModel.js";

import { createAuctionController } from "./auctionController.js"; // Import your auction controller

import Auction from "../models/auctionModel.js";


export const addProductController = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      seller,
      
      basePrice,
      quantity,
      unit,
      quality,
      harvestDate,
      expiryDate,
      location,
      status,
      bidEndTime,
      upForAuction,
    } = req.body;

    const images = req.files ? req.files.map(file => file.path) : [];

    // Validation
    if (
      !name ||
      !description ||
      !location ||
      !category ||
      !seller ||
      !images.length ||
      !basePrice ||
      !quantity ||
      !unit ||
      !quality ||
      !harvestDate ||
      !expiryDate ||
      !status

    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (isNaN(basePrice) || basePrice <= 0) {
      return res.status(400).json({ error: "Base price must be a positive number" });
    }

    if (isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({ error: "Quantity must be a positive number" });
    }

    console.log("product is: ",);
    
    // Create product
    const product = new Product({
      name,
      description,
      category,
      seller,
      images,
      basePrice: Number(basePrice),
      quantity: Number(quantity),
      unit,
      quality,
      location,
      harvestDate: new Date(harvestDate),
      expiryDate: new Date(expiryDate),
      status,
      upForAuction,
      bidEndTime: upForAuction && bidEndTime ? new Date(bidEndTime) : null,
    });
    

    await product.save();

    // Handle auction creation if the product is marked for auction
    if (upForAuction) {
      if (!bidDuration || !["hours", "days"].includes(bidDuration.unit) || isNaN(bidDuration.value) || bidDuration.value <= 0) {
        return res.status(400).json({ error: "Invalid bid duration for auction" });
      }

      const currentTime = new Date();
      const endTime =
        bidDuration.unit === "hours"
          ? new Date(currentTime.getTime() + bidDuration.value * 60 * 60 * 1000) // Add hours
          : new Date(currentTime.getTime() + bidDuration.value * 24 * 60 * 60 * 1000); // Add days

      const auction = new Auction({
        productId: product._id,
        ownerId: seller,
        basePrice,
        endTime,
      });

      await auction.save();
    }

    res.status(201).json({
      message: "Product added successfully",
      product,
      ...(upForAuction && { auction: "Auction created successfully" }), // Include auction message if applicable
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all products for a specific user
export const getUserProductsController = async (req, res) => {
  try {
    const userId = req.user._id; // req.user._id is populated by the verifyToken middleware

    // Fetch products where seller matches userId
    const products = await Product.find({ seller: userId });

    if (!products || products.length === 0) {
      return res.status(200).json({
        message: "No products found for this user",
        products: [],
      });
    }

    res.status(200).json({
      message: "Products fetched successfully",
      totalProducts: products.length,
      products,
    });
  } catch (error) {
    console.error("Error fetching user products:", error);
    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};  





// Update product by ID
export const updateProductController = async (req, res) => {
  try {
    const { id } = req.params; // Get product ID from request params
    const updatedData = req.body; // Get the updated data from request body

    console.log("Id is this: ",id);
    
    // Check if the product ID exists in the request
    if (!id) {
      return res.status(400).json({ error: "Product ID is required" });
    }

        // Handle image uploads
        if (req.files && req.files.length > 0) {
          const newImageUrls = req.files.map(file => file.path);
          updatedData.images = newImageUrls;
        }
    

    // Validate fields (optional: customize based on requirements)
    const requiredFields = [
      "name",
      "description",
      "category",
      "seller",
      "images",
      "basePrice",
      "quantity",
      "unit",
      "quality",
      "harvestDate",
      "expiryDate",
      "location",
      "status",
    ];
    for (const field of requiredFields) {
      if (field in updatedData && !updatedData[field]) {
        return res.status(400).json({ error: `${field} cannot be empty` });
      }
    }

    // Validate basePrice and quantity if provided
    if ("basePrice" in updatedData && (isNaN(updatedData.basePrice) || updatedData.basePrice <= 0)) {
      return res.status(400).json({ error: "Base price must be a positive number" });
    }
    if ("quantity" in updatedData && (isNaN(updatedData.quantity) || updatedData.quantity <= 0)) {
      return res.status(400).json({ error: "Quantity must be a positive number" });
    }

    // Handle bid duration update (optional)
    if (updatedData.bidDuration) {
      const { unit, value } = updatedData.bidDuration;
      if (!["hours", "days"].includes(unit) || isNaN(value) || value <= 0) {
        return res.status(400).json({ error: "Invalid bid duration" });
      }
      const currentTime = new Date();
      if (unit === "hours") {
        updatedData.bidEndTime = new Date(currentTime.getTime() + value * 60 * 60 * 1000);
      } else if (unit === "days") {
        updatedData.bidEndTime = new Date(currentTime.getTime() + value * 24 * 60 * 60 * 1000);
      }
    }

    // Update the product
    const product = await Product.findByIdAndUpdate(id, updatedData, { new: true });

    // Check if product exists
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Respond with the updated product
    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Error updating product:", error);

    // Return server error response
    res.status(500).json({
      message: "Failed to update product due to a server error",
      error: error.message,
    });
  }
};


// Delete product by ID
export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params; // Get product ID from request params

    // Check if product ID is provided
    if (!id) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    // Find and delete the product
    const deletedProduct = await Product.findByIdAndDelete(id);

    // Check if the product exists
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Respond with a success message and the deleted product details
    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting product:", error);

    // Handle server error
    res.status(500).json({
      message: "Failed to delete product due to a server error",
      error: error.message,
    });
  }
};








