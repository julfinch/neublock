import Asset from "../models/Asset.js";
import User from "../models/User.js";
import mongoose from "mongoose";

export const addAsset = async (req, res) => {
    try {
        const {
            amount,
            price,
            token,
            email,
        } = req.body;

        const session = await mongoose.startSession();
        session.startTransaction();

        const user = await User.findOne({ email }).session(session);
        // const user = await User.findById({ userId }).session(session);

        const { id } = req.params;

        // //Find the user by userId
        // const user = await User.findById(id);

        if(!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Create a new item and associate it with the user
        // const newAsset = new Asset({
        //     amount,
        //     price,
        //     token,
        //     user: user._id,        
        // });

        const newAsset = await Asset.create({
            amount,
            price,
            token,
            user: id,        
        });

        // Save the new item
        // await newAsset.save();

        // Update the user's items array
        user.assets.push(newAsset._id);
        await user.save({session});

        await session.commitTransaction();

        return res.status(200).json({ message: 'Asset added successfully' });
    } catch (error) {
        console.error('Error adding asset:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};

export const getAssetsByUserId = async ( req, res ) => {
    try {
        const { userId } = req.params

        // Find the user by userId and populate the items array
        const user = await User.findById(userId).populate('assets');
        console.log("🚀 ~ file: assetController.js:66 ~ getAssetsByUserId ~ user:", user)
        
        if(!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const assets = user.assets;

        return res.status(200).json({ assets });

    } catch (error) {
        console.error('Error retrieving assets:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};

// export const deleteAsset = async (req, res) => {
//     try {
//         const { assetId } = req.params;
//         console.log("Asset ID", assetId)
//         // const assetToDelete = await Asset.findById(assetId).populate("user");
//         const assetToDelete = await Asset.findById({_id: assetId}).populate("user");
//         console.log("AssetToDelete", assetToDelete)

//         console.log("AssetToDelete ID", assetToDelete._id)
//         console.log("AssetToDelete user", assetToDelete.user)

//         // if (!assetToDelete.user) throw new Error("User with assetToDelete was not found")
//         if (!assetToDelete) throw new Error("Asset not found");
        

//         const session = await mongoose.startSession();
//         session.startTransaction();

//         assetToDelete.remove({ session });
//         assetToDelete.assets.pull(assetToDelete._id);

//         await assetToDelete.save({ session });
//         await session.commitTransaction();

//         res.status(200).json({ message: "Asset deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

export const deleteAsset = async (req, res) => {
    const { assetId } = req.params;
  
    try {
      // Delete the asset
      await Asset.findByIdAndDelete(assetId);
      // Remove the asset reference from the user's assets array
      await User.updateOne({ _id: assetId }, { $pull: { assets: assetId } });
        
      res.status(200).json({ message: "Asset deleted successfully" });
    } catch (error) {
      console.error('Error deleting asset:', error);
      res.status(500).json({ error: 'Failed to delete asset' });
    }
  };