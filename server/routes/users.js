import express from "express";
import {
  getUser,
  getAllUsers,
  getUserFriends,
  addRemoveFriend,
  getLikedCoins,
  addToLikedCoins,
  removeFromLikedCoins,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/", getAllUsers)
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

router.post("/add", addToLikedCoins);
router.get("/liked/:email", getLikedCoins);
router.put("/remove", removeFromLikedCoins);

export default router;