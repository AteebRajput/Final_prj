import express from "express";
import { createOrderController, updateOrderStatusController,fetchFarmerOrdersController } from "../controller/orderController.js";

const router = express.Router();

router.post("/create", createOrderController);
router.put("/:orderId/status", updateOrderStatusController);
// Fetch orders for a specific farmer
router.get('/get-orders/:farmerId', fetchFarmerOrdersController);

export default router;
