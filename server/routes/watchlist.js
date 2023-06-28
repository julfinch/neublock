import express from "express";
import {
  getWatchlist, 
  addToWatchlist, 
  removeFromWatchlist,
  addCoin,
} from "../controllers/watchlist.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Get user's watchlist
router.get('/', getWatchlist);

// Add a coin to user's watchlist
router.post('/', addToWatchlist);

// Remove a coin from user's watchlist
router.delete('/:coinId', removeFromWatchlist);

// router.put("/:id/like", addCoin)


export default router;
