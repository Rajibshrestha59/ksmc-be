const express = require("express");

const router = express.Router();

const { register, login, getAllUsers } = require("../controllers/User");

router.post("/register", register);
router.post("/login", login);
router.get("/users", getAllUsers);
``;

module.exports = router;
