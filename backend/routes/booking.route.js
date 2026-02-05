import express from "express";
import isAuth from "../middleware/isAuth.js";
import {
  cancelBooking,
  createBooking,
} from "../controller/booking.controller.js";

const router = express.Router();

router.post("/create/:id", isAuth, createBooking);
router.delete("/cancel/:id", isAuth, cancelBooking);

export default router;
