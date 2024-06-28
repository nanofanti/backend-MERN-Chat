const User = require("../schemas/User");
const bcrypt = require("bcrypt");
const { createTokenAndSetCookie } = require("../utils/generateToken");

//SIGN UP
const createUser = async (req, res) => {
  try {
    const {
      fullName,
      username,
      password,
      confirmPassword,
      gender,
      profilePic,
    } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    // Check if user already exists
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      //Generate JWT Token
      createTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res
        .status(201)
        .json({ message: "User created successfully!", data: newUser });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.error("Error in sign up controller:", error);
  }
};

//LOG IN
const logIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      throw Error("Username incorrect or does not exist");
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!isPasswordCorrect) {
      throw Error("Incorrect password");
    }

    createTokenAndSetCookie(user._id, res);

    res.status(201).json({ message: "Logged in successfully!", data: user });
  } catch (error) {
    console.error("Error in log in controller:", error);
    res.status(400).json({ error: error.message });
  }
};

//LOG OUT
const logOut = (req, res) => {
  try {
    //TO CLEAR TO COOKIES
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in log out controller:", error);
    res.status(400).json({ error: error.message });
  }
};

//GET ALL USERS
const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    //Find allUsers except the one who has the same _id as the user who's logged in
    const allUsersExceptLoggedIn = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(allUsersExceptLoggedIn);
  } catch (error) {
    console.error("Error in getUsersForSidebar controller:", error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createUser, logIn, logOut, getUsersForSidebar };
