import uploadCloudinary from "../config/cloudinary.js";
import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";

export const addListing = async (req, res) => {
  try {
    const host = req.userId;
    const { title, description, rent, city, landMark, category } = req.body;
    const image1 = await uploadCloudinary(req.files.image1[0].path);

    const listing = await Listing.create({
      title,
      description,
      rent,
      city,
      landMark,
      category,
      image1,
      host,
    });

    let user = await User.findByIdAndUpdate(
      host,
      { $push: { listing: listing._id } },
      { new: true }
    );
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    return res.status(201).json(listing);
  } catch (error) {
    console.log("error in listing controller:- ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getListing = async (req, res) => {
  try {
    const listing = await Listing.find().sort({ createdAt: -1 });
    return res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ message: `getListing error ${error}` });
  }
};

export const findListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: "listing not found" });
    }
    return res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};

export const updateListing = async (req, res) => {
  try {
    let image1;

    const { id } = req.params;
    const { title, description, rent, city, landMark, category } = req.body;
    if (req.files.image1) {
      image1 = await uploadCloudinary(req.files.image1[0].path);
    }

    const listing = await Listing.findByIdAndUpdate(
      id,
      {
        title,
        description,
        rent,
        city,
        landMark,
        category,
        image1,
      },
      { new: true }
    );

    return res.status(201).json(listing);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findByIdAndDelete(id);
    const user = await User.findByIdAndUpdate(
      listing.host,
      {
        $pull: { listing: listing._id },
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "user is not found" });
    }
    return res.status(201).json({ message: "Listing deleted" });
  } catch (error) {
    return res.status(500).json({ message: `Delete Listing Error:- ${error}` });
  }
};

export const ratingListing = async (req, res) => {
  try {
    const { id } = req.params;
    const { ratings } = req.body;
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: "listing not found" });
    }
    listing.ratings = Number(ratings);
    await listing.save();
    return res.status(200).json({ message: listing.ratings });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Rating Error" });
  }
};

export const search = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "search query is required" });
    }
    const listing = await Listing.find({
      $or: [
        { landMark: { $regex: query, $options: "i" } },
        { city: { $regex: query, $options: "i" } },
        { title: { $regex: query, $options: "i" } },
      ],
    });
    return res.status(200).json(listing);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
