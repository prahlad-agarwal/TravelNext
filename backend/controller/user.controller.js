import getToken from "../jwt/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exist" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });
    getToken(user._id, res);
    return res.status(201).json(user);
  } catch (error) {
    console.log("Error in user controller:- ", error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
      .populate(
        "listing",
        "title image1 description rent category city landMark isBooked host ratings"
      )
      .populate(
        "booking",
        "title image1 description rent category city landMark isBooked host ratings"
      );
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(400).json({ message: "Invalid Username and Password" });
    }
    getToken(user._id, res);
    return res.status(201).json(user);
  } catch (error) {
    console.log("Error in user controller:- ", error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(201).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log("Error :", error.message);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select("-password")
      .populate(
        "listing",
        "title image1 image2 image3 description rent category city landMark"
      );
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: `getCurrentUser error ${error}` });
  }
};
