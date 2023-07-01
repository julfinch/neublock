import User from "../models/User.js";


export const editUser = async (req, res) => {
	try {
		const { id } = req.params;	
		const { firstName, lastName, email, password, picturePath } = req.body;

	  // Find the user by ID
		const user = await User.findById(id);

	  // Update the user information
		user.firstName = firstName;
		user.lastName = lastName;
		user.email = email;
		user.password = password;
		user.picturePath = picturePath;

	  // Save the updated user
		const updatedUser = await user.save();	

		res.status(200).json(updatedUser);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};


/* READ */
// In the getUser, we grab the id of the user from req.params(1st line) 
// and then we grab that current user and find that specific user using 
// his id(2nd line) before we finally send all information of that user 
// to the frontend(3rd line).

export const getUser = async (req, res) => {
	try {
		// we grab the id of the user from req.params
		const { id } = req.params;

		// we grab that current user and find that specific user using his id
		const user = await User.findById({_id: id}).populate("assets");

		// before we finally send all information of that user to the frontend
		res.status(200).json(user);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: "user" }).select("-password");
        res.status(200).json(users)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


export const getUserFriends = async (req, res) => {
	try {
		// Grab the id of the current user and find it from the list of Users
		const { id } = req.params;
		const user = await User.findById(id);

		// We use Promise.all because we are going to make multiple
		// API calls to the databse. Based from the data that we get 
		// from the current user, we map his list of friends and grab 
		// each id of the friends that the user have and grab all the
		//  information of all the friends based on their IDs.
		const friends = await Promise.all(
		user.friends.map((id) => User.findById(id))
		);

		// Now that we have a list of friends, we map each of them to get
		// each of their individual data like id, firstName, lastName, etc.
		// Since it's and array, we format them base on what frontend needs
		// by returning a object
		const formattedFriends = friends.map(
		({ _id, firstName, lastName, occupation, location, picturePath }) => {
			return { _id, firstName, lastName, occupation, location, picturePath };
		}
		);
		res.status(200).json(formattedFriends);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
	try {
		const { id, friendId } = req.params;
		const user = await User.findById(id);
		const friend = await User.findById(friendId);
	
		if (user.friends.includes(friendId)) {
			user.friends = user.friends.filter((id) => id !== friendId);
			friend.friends = friend.friends.filter((id) => id !== id);
		} else {
			user.friends.push(friendId);
			friend.friends.push(id);
		}
		await user.save();
		await friend.save();
	
		const friends = await Promise.all(
			user.friends.map((id) => User.findById(id))
		);
		const formattedFriends = friends.map(
			({ _id, firstName, lastName, occupation, location, picturePath }) => {
			return { _id, firstName, lastName, occupation, location, picturePath };
			}
		);
	
		res.status(200).json(formattedFriends);
		} catch (err) {
		res.status(404).json({ message: err.message });
	}
};


// ------------------------------------------------------------------
export const getLikedCoins = async (req, res) => {
	try {
	  const { email } = req.params;
	  const user = await User.findOne({ email });
	  if (user) {
		return res.json({ msg: "success", liked: user.liked });
	  } else return res.json({ msg: "User with given email not found." });
	} catch (error) {
	  return res.json({ msg: "Error fetching coins." });
	}
  };
  
  export const addToLikedCoins = async (req, res) => {
	try {
	  const { email, uuid } = req.body;
	  const user = await User.findOne({ email });
	  if (user) {
		const { liked } = user;
		// const movieAlreadyLiked = liked.find(({ id }) => id === uuid.id);
		const coinAlreadyLiked = liked.find((coin) => coin === uuid);
		if (!coinAlreadyLiked) {
		  await User.findByIdAndUpdate(
			user._id,
			{
			  liked: [...user.liked, uuid],
			},
			{ new: true }
		  );
		} else return res.json({ msg: "Coin already added to the liked list." });
	  } else await User.create({ email, liked: [uuid] });
	  return res.json({ msg: "Coin successfully added to liked list." });
	} catch (error) {
	  return res.json({ msg: "Error adding coin to the liked list" });
	}
  };
  
  export const removeFromLikedCoins = async (req, res) => {
	try {
	  const { email, uuid } = req.body;
	  const user = await User.findOne({ email });
	  if (user) {
		const coins = user.liked;
		const coinIndex = coins.findIndex(({ id }) => id === uuid);
		if (!coinIndex) {
		  res.status(400).send({ msg: "Coin not found." });
		}
		coins.splice(coinIndex, 1);
		await User.findByIdAndUpdate(
		  user._id,
		  {
			liked: coins,
		  },
		  { new: true }
		);
		return res.json({ msg: "Coin successfully removed.", coins });
	  } else return res.json({ msg: "User with given email not found." });
	} catch (error) {
	  return res.json({ msg: "Error removing coin to the liked list" });
	}
  };