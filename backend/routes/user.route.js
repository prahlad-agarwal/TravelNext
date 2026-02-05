import express from "express";
import {
  getCurrentUser,
  login,
  logout,
  signup,
} from "../controller/user.controller.js";
import isAuth from "../middleware/isAuth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/currentuser", isAuth, getCurrentUser);

export default router;
