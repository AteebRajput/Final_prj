import express from 'express';
import { placeBidController } from '../controller/biddingController.js';


const router = express.Router()

router.post("/place-bid",placeBidController)

export default router