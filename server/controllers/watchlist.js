import User from "../models/User.js";
import Watchlist from "../models/Watchlist.js";
import mongoose from "mongoose";

// Get the user's watchlist
export const getWatchlist = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).populate('watchlist');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.watchlist);
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Add a coin to the user's watchlist
export const addToWatchlist = async (req, res) => {
  try {
    const { username } = req.params;
    const { coin } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newCoin = await Watchlist.create(coin);
    user.watchlist.push(newCoin);
    await user.save();

    res.status(201).json(newCoin);
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Remove a coin from the user's watchlist
export const removeFromWatchlist = async (req, res) => {
  try {
    const { username, coinId } = req.params;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const coinIndex = user.watchlist.findIndex((coin) => coin.toString() === coinId);
    if (coinIndex === -1) {
      return res.status(404).json({ error: 'Coin not found in watchlist' });
    }

    user.watchlist.splice(coinIndex, 1);
    await user.save();

    res.json({ message: 'Coin removed from watchlist' });
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


// STAR/UNSTAR A COIN
export const addCoin = async (req, res) => {
  const { username } = req.params;
  const { coin } = req.body;

  const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

  try {
    const watchlist = await Watchlist.findOne({ coin });
    if (!user.watchlist.includes(coin.uuid)) {
      await user.updateOne({ $push: { watchlist: coin } });
      res.status(200).json("Coin added");
    } else {
      await user.updateOne({ $pull: { watchlist: coin } });
      res.status(200).json("Coin removed");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};