import React, { createContext, useContext, useState } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";
import { userDataContext } from "./UserContext";
import { listingDataContext } from "./ListingContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const bookingDataContext = createContext();
const BookingContext = ({ children }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [total, setTotal] = useState(0);
  const [night, setNight] = useState(0);
  const { serverUrl } = useContext(authDataContext);
  const { getCurrentUser } = useContext(userDataContext);
  const { handleGetListing } = useContext(listingDataContext);
  const [bookingData, setBookingData] = useState([]);
  const [booking, setBooking] = useState(false);
  const navigate = useNavigate();

  const handleBooking = async (id) => {
    setBooking(true);
    try {
      const res = await axios.post(
        serverUrl + `/api/booking/create/${id}`,
        {
          checkIn,
          checkOut,
          totalRent: total,
        },
        { withCredentials: true }
      );
      await getCurrentUser();
      await handleGetListing();
      setBookingData(res.data);
      console.log(res.data);
      setBooking(false);
      navigate("/booked");
      toast.success("Booking Successfully");
    } catch (error) {
      console.log(error);
      setBookingData(null);
      setBooking(false);
      toast.error(error.response.data.message);
    }
  };

  const cancelBooking = async (id) => {
    try {
      const res = await axios.delete(serverUrl + `/api/booking/cancel/${id}`, {
        withCredentials: true,
      });
      await getCurrentUser();
      await handleGetListing();
      console.log(res.data);
      toast.success("Booking Cancel Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const value = {
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    total,
    setTotal,
    night,
    setNight,
    bookingData,
    setBookingData,
    handleBooking,
    cancelBooking,
    booking,
    setBooking,
  };
  return (
    <div>
      <bookingDataContext.Provider value={value}>
        {children}
      </bookingDataContext.Provider>
    </div>
  );
};
export default BookingContext;
