import express from "express"
import multer from "multer"
import { storage } from "../config/cloudinary.js" // Import Cloudinary storage
import { protect, verifyToken } from "../middleware/verifyToken.js"
import { 
  addProductController, 
  deleteProductController, 
  getUserProductsController, 
  updateProductController 
} from "../controller/productController.js"

const router = express.Router()
const upload = multer({ storage: storage })

// Use upload.array for multiple image uploads
router.post("/add-product", upload.array('images', 5), addProductController)
router.put("/update-product/:id", upload.array('images', 5), updateProductController)

router.get("/get-all-products/:userId", verifyToken, getUserProductsController)
router.delete("/delete-product/:id", deleteProductController)

export default router