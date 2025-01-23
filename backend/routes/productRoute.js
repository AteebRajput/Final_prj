import express from "express"
import { protect, verifyToken } from "../middleware/verifyToken.js"

import { addProductController, deleteProductController, getUserProductsController, updateProductController } from "../controller/productController.js"

const router = express.Router()

router.post("/add-product",addProductController)

router.get("/get-all-products/:userId",verifyToken,getUserProductsController)

router.put("/update-product/:id",updateProductController)

router.delete("/delete-product/:id",deleteProductController)











export default router