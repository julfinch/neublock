import mongoose from "mongoose"

const WatchlistSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  iconUrl: {
    type: String,
    required: true,
  },
  marketCap: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  change: {
    type: String,
    required: true,
  },
  sparkline: {
    type: Array,
    required: true,
  },
},
{ timestamps: true }
);

const Watchlist = mongoose.model('Watchlist', WatchlistSchema);
export default Watchlist;
