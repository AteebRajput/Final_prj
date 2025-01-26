import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

// export const placeOrderController = async (req, res) => {
//   try {
//     const { productId, buyerId, quantity } = req.body;

//     // Validation
//     if (!productId || !buyerId || isNaN(quantity) || quantity <= 0) {
//       return res.status(400).json({ error: "Invalid input for order placement" });
//     }

//     const product = await Product.findById(productId);
//     if (!product) return res.status(404).json({ error: "Product not found" });

//     if (buyerId === product.seller) {
//       return res.status(400).json({ error: "You cannot order your own product" });
//     }

//     if (quantity < product.minQuantity) {
//       return res.status(400).json({ error: `Minimum order quantity is ${product.minQuantity}` });
//     }

//     // Calculate total price
//     const totalPrice = quantity * product.basePrice;

//     // Create order
//     const order = new Order({
//       productId,
//       buyer: buyerId,
//       seller: product.seller,
//       quantity,
//       totalPrice,
//     });

//     await order.save();

//     // Notify seller and buyer
//     console.log("Notify seller:", product.seller);
//     console.log("Notify buyer:", buyerId);

//     res.status(201).json({ message: "Order placed successfully", order });
//   } catch (error) {
//     console.error("Error placing order:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };


export const createOrderController = async (req, res) => {
  try {
    const { auctionId, winnerId, productId, amount,sellerId } = req.body;

    const newOrder = new Order({
      auctionId,
      winnerId,
      productId,
      sellerId,
      amount,
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateOrderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const fetchFarmerOrdersController = async (req, res) => {
  const { farmerId } = req.params; // Extract farmerId from route params
  const { status } = req.query; // Extract status from query params

  try {
    // Build a filter object
    const filter = { sellerId: farmerId };
    if (status) filter.status = status;

    // Fetch orders and populate referenced fields
    const orders = await Order.find(filter)
      .populate('productId', 'name email') // Populate product details
      .populate('winnerId', 'name email'); // Populate buyer details (winner)

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching farmer orders:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
