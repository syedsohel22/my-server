const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
require("dotenv").config();

const userRouter = Router();

userRouter.post("/register", async (req, res) => {
  try {
    const payload = req.body;
    const userData = await UserModel.findOne({ email: payload.email });

    if (userData) {
      res.send({ result: "User already exist, please login" });
    } else {
      const passwordHash = await bcrypt.hashSync(payload.password, 8);
      console.log(passwordHash);
      payload.password = passwordHash;

      const newUser = UserModel(payload);
      await newUser.save();

      res.json({ result: "Registration Successful" });
    }
  } catch (error) {
    res.send({ error: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const payload = req.body;

    const userData = await UserModel.findOne({ email: payload.email });
    if (!userData) {
      res.send({ result: "Please register first" });
    }

    const correctPassword = await bcrypt.compareSync(
      payload.password,
      userData.password
    );
    if (correctPassword) {
      const token = await jwt.sign(
        { email: userData.email, user_id: userData._id },
        process.env.KEY
      );
      res.status(200).json({ result: "Login Successful", token });
    } else {
      res.status(401).json({ result: "No user found" });
    }
  } catch (error) {
    res.send({ error: error });
  }
});

module.exports = userRouter;
