const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmailNotification = require("../config/mailer");
const sendTelegramNotification = require("../config/telegram");
const { generateToken, verifyToken } = require("../middleware/auth");
const router = express.Router();

/**
 * @swagger
 *
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: User Register
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: String
 *                 example: "abcde@gmail.com"
 *               password:
 *                 type: String
 *                 example: "abcde123"
 *     responses:
 *       200:
 *         description: User registered successfully
 *
 *
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: User Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: String
 *                 example: "abcde@gmail.com"
 *               password:
 *                 type: String
 *                 example: "abcde123"
 *     responses:
 *       200:
 *         description: User token
 * 
 * /api/auth/listuser:
 *   get:
 *     tags: 
 *       - Auth
 *     summary: Get List User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */

// Local Strategy
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    user = new User({ email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    res.json({ msg: "User registered successfully" });

    sendTelegramNotification(user);
    sendEmailNotification(user.email);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const userId = user.id;
    const token = generateToken(userId);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/listuser", verifyToken, async (req, res) => {
  try {
    const users = await User.find({})
    const listuser = users.map(user => user.email);
    res.json({ users: listuser });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
