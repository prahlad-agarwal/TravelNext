import mongoose, { set } from "mongoose";
import User from "./user.model.js";

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    guest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    image1: {
      type: String,
      required: true,
    },
    rent: {
      type: Number,
      required: true,
    },
    landMark: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    ratings: {
      type: Number,
      mine: 0,
      max: 5,
      default: 0,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
