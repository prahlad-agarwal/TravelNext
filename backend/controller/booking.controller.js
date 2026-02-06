import Booking from "../models/booking.model.js";
import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";

export const createBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { checkIn, checkOut, totalRent } = req.body;
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing is not found" });
    }
    if (new Date(checkIn) >= new Date(checkOut)) {
      return res.status(400).json({ message: "Invalid checkIn/checkOut date" });
    }
    if (listing.isBooked) {
      return res.status(400).json({ message: "Listing is already booked" });
    }
    const booking = await Booking.create({
      checkIn,
      checkOut,
      totalRent,
      host: listing.host,
      guest: req.userId,
      listing: listing._id,
    });
    await booking.populate("host", "email");
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        $push: { booking: listing },
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "user is not found" });
    }
    listing.guest = req.userId;
    listing.isBooked = true;
    await listing.save();
    return res.status(201).json(booking);
  } catch (error) {
    return res.status(500).json({ message: `Booking error:- ${error}` });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, {
      isBooked: false,
    });
    const user = await User.findByIdAndUpdate(
      listing.guest,
      {
        $pull: { booking: listing._id },
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.status(200).json({ message: "booking cancelled" });
  } catch (error) {
    return res.status(500).json({ message: "booking cancelled error" });
  }
};
