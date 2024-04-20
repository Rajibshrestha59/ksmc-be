const User = require("../models/User");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { firstName, lastName, emailAddress, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  // // Check if all fields are provided
  if (!firstName || !lastName || !emailAddress || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const user = new User({
      firstName,
      lastName,
      emailAddress,
      password: hashedPassword,
    });
    user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const login = async (req, res) => {
  const { emailAddress, password } = req.body;

  if (!emailAddress || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    //find user from database
    const user = await User.findOne({ emailAddress });

    // check if user exists
    if (!user) {
      return res.status(400).json({ error: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Password doesn't match" });
    }

    res.status(200).json({ message: "Login Successfully" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { register, login, getAllUsers };
