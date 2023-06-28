import express from "express";
import {
  addAsset, 
  getAssetsByUserId, 
  deleteAsset
} from "../controllers/assetController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// CREATE A NEW CRYPTO DATA ENTRY FOR A USER
router.post("/", addAsset);
router.get("/:userId", getAssetsByUserId);
router.delete("/:assetId", deleteAsset);

export default router;