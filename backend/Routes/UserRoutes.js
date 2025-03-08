const express = require("express");
const User = require("../model/UserModel");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/", (req, res) => {
  res.send("I called");
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const checkuser = await User.findOne({ email });
    if (checkuser) {
      return res.status(409).json("User already exist");
    }
    const user = new User({ name, email, password });
    user.password = await bcrypt.hash(password, 10);
    await user.save();
    res.status(200).json({ message: "Signed up!!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkuser = await User.findOne({ email });
    if (!checkuser) {
      return res.status(403).json("You don't have an account with this email");
    }
    const isPassmatch = await bcrypt.compare(password, checkuser.password);
    if (!isPassmatch) {
      return res.status(403).json("Email or Password is incorrect");
    }
    const jwttoken = jwt.sign(
      { email: checkuser.email, _id: checkuser._id },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );
    res.cookie("token", jwttoken, {
      httpOnly: true, 
      secure: process.env.NODE_ENV, 
      sameSite: "None",
    });

    res.status(201).json({message:"Login Successfuly",email,jwttoken})
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Interval server Error"})
  }
});

module.exports = router;
