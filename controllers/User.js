const User = require("../models/User");

const register = (req, res) => {
  const { firstName, lastName, emailAddress, password } = req.body;
  console.log(firstName);

  // Check if all fields are provided
  if (!firstName || !lastName || !emailAddress || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const user = new User({
      firstName,
      lastName,
      emailAddress,
      password,
    });
    user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { register };
