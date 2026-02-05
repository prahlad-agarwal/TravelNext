import React, { useContext, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../context/ListingContext";
import { userDataContext } from "../context/UserContext";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { FaStar } from "react-icons/fa";
import { bookingDataContext } from "../context/BookingContext";
import { toast } from "react-toastify";

const ViewCard = () => {
  const navigate = useNavigate();
  const { cardDetails } = useContext(listingDataContext);
  const { userData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const [popup, setPopup] = useState(false);
  const [bookingPopup, setBookingPopup] = useState(false);
  const [title, setTitle] = useState(cardDetails.title);
  const [description, setDescription] = useState(cardDetails.description);
  const [backEndImage1, setBackEndImage1] = useState(null);
  // const [backEndImage2, setBackEndImage2] = useState(null);
  // const [backEndImage3, setBackEndImage3] = useState(null);
  const [rent, setRent] = useState(cardDetails.rent);
  const [city, setCity] = useState(cardDetails.city);
  const [landmark, setLandmark] = useState(cardDetails.landMark);
  const { updating, setUpdating } = useContext(listingDataContext);
  const { deleting, setDeleting } = useContext(listingDataContext);
  const [minDate, setMinDate] = useState("");

  const {
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    total,
    setTotal,
    night,
    setNight,
    handleBooking,
    booking,
  } = useContext(bookingDataContext);

  useEffect(() => {
    if (checkIn && checkOut) {
      const inDate = new Date(checkIn);
      const outDate = new Date(checkOut);
      const n = (outDate - inDate) / (24 * 60 * 60 * 1000);
      setNight(n);
      const airBnbCharge = cardDetails.rent * (7 / 100);
      const tax = cardDetails.rent * (7 / 100);
      if (n > 0) {
        setTotal(cardDetails.rent * n + airBnbCharge + tax);
      } else {
        setTotal(0);
      }
    }
  }, [checkIn, checkOut, cardDetails.rent, total]);

  const handleUpdateListing = async () => {
    setUpdating(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      if (backEndImage1) formData.append("image1", backEndImage1);
      // if (backEndImage2) formData.append("image2", backEndImage2);
      // if (backEndImage3) formData.append("image3", backEndImage3);
      formData.append("description", description);
      formData.append("rent", rent);
      formData.append("city", city);
      formData.append("landMark", landmark);

      const res = await axios.post(
        serverUrl + `/api/listing/update/${cardDetails._id}`,
        formData,
        {
          withCredentials: true,
        }
      );
      setUpdating(false);
      console.log(res);
      navigate("/");
      toast.success("Listing Updated");
      setTitle("");
      setDescription("");
      setBackEndImage1(null);
      // setBackEndImage2(null);
      // setBackEndImage3(null);
      setRent("");
      setCity("");
      setLandmark("");
    } catch (error) {
      setUpdating(false);
      console.log("Error in handleUpdateListing:- ", error);
    }
  };

  const handleDeleteListing = async () => {
    setDeleting(true);
    try {
      const res = await axios.delete(
        serverUrl + `/api/listing/delete/${cardDetails._id}`,
        { withCredentials: true }
      );
      console.log(res.data);
      navigate("/");
      toast.success("Listing Delete");
      setDeleting(false);
    } catch (error) {
      console.log(error);
      setDeleting(false);
      toast.error(error.response.data.message);
    }
  };

  const handleImage1 = (e) => {
    let file = e.target.files[0];
    setBackEndImage1(file);
  };

  // const handleImage2 = (e) => {
  //   let file = e.target.files[0];
  //   setBackEndImage2(file);
  // };

  // const handleImage3 = (e) => {
  //   let file = e.target.files[0];
  //   setBackEndImage3(file);
  // };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setMinDate(today);
  }, []);
  return (
    <div className="w-[100%] h-[100vh] bg-white flex items-center justify-center gap-[10px] flex-col overflow-auto relative">
      <div
        className="w-[50px] h-[50px] cursor-pointer absolute top-[5%] left-[20px] rounded-[50%] flex items-center justify-center bg-[red]"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft className="w-[25px] h-[25px] text-[white]" />
      </div>

      <div className="w-[95%] flex items-start justify-start text-[25px] md:w-[80%] mb-[10px]">
        <h1 className="text-[20px] text-[#272727] md:text-[30px] text-ellipsis text-nowrap overflow-hidden px-[70px] md:px-[0px]">
          {`In ${cardDetails.landMark.toUpperCase()}, ${cardDetails.city.toUpperCase()}`}
        </h1>
      </div>

      <div className="w-[95%] h-[400px] flex items-center justify-center flex-col md:w-[80%] md:flex-row">
        <div className="w-[100%] h-[65%] flex items-center justify-center md:w-[70%] md:h-[100%] overflow-hidden border-[2px] border-white">
          <img
            src={cardDetails.image1}
            alt="image1"
            className="w-[100%]"
            // style={{ width: "100%" }}
          />
        </div>
        {/* <div className="w-[100%] h-[30%] flex items-center justify-center md:w-[30%] md:h-[100%] md:flex-col">
          <div className="w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px]">
            <img src={cardDetails.image2} alt="image2" className="w-[100%]" />
          </div>
          <div className="w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px]">
            <img src={cardDetails.image3} alt="image3" className="w-[100%]" />
          </div>
        </div> */}
      </div>
      <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]">{`${cardDetails.title.toUpperCase()} ${cardDetails.category.toUpperCase()}, ${cardDetails.landMark.toUpperCase()}`}</div>
      <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] text-gray-800">{`${cardDetails.description}`}</div>
      <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]">{`Rs.${cardDetails.rent}/day`}</div>

      <div className="w-[95%] h-[50px] flex items-center justify-start px-[90px]">
        {cardDetails.host == userData._id && (
          <button
            className="px-[30px] py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px] rounded-lg text-nowrap"
            style={{ borderRadius: "10px" }}
            onClick={() => {
              setPopup(!popup);
            }}
          >
            Edit listing
          </button>
        )}

        {cardDetails.host != userData._id && (
          <button
            className="px-[30px] py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px] rounded-lg text-nowrap"
            style={{ borderRadius: "10px" }}
            onClick={() => {
              setBookingPopup(!bookingPopup);
            }}
          >
            Reserve
          </button>
        )}
      </div>

      {/* update listing page */}
      {popup && (
        <div className="w-[100%] h-[100%] flex items-center justify-center bg-[#000000a9] absolute top-[0px] z-[100] backdrop-blur-sm">
          <RxCross2
            className="w-[50px] h-[50px] cursor-pointer absolute top-[5%] left-[20px] rounded-[50%] flex items-center justify-center bg-[red]"
            onClick={() => setPopup(false)}
          />

          <form
            className="max-w-[900px] w-[90%] h-[550px] flex items-center justify-start flex-col gap-[10px] overflow-auto mt-[50px] text-white bg-[#272727] p-[20px] rounded-lg"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="w-[200px] h-[50px] text-[20px] bg-[#f14242] text-[white] flex items-center justify-center rounded-[30px] absolute top-[5%] right-[10px] shadow-lg">
              Update your details
            </div>

            <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
              <label htmlFor="title" className="text-[20px]">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]"
                required
                placeholder="_bhk house or best title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>

            <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
              <label htmlFor="description" className="text-[20px]">
                Description
              </label>
              <textarea
                name=""
                id="description"
                className="w-[90%] h-[80px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]"
                required
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></textarea>
            </div>

            <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
              <label htmlFor="image1" className="text-[20px]">
                Image1
              </label>
              <div className="flex items-center justify-start w-[90%] h-[40px] border-[2px] border-[#555656] rounded-[10px]">
                <input
                  type="file"
                  id="image1"
                  className="w-[100%] text-[15px] px-[10px]"
                  required
                  onChange={handleImage1}
                />
              </div>
            </div>

            {/* <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
              <label htmlFor="image2" className="text-[20px]">
                Image2
              </label>
              <div className="flex items-center justify-start w-[90%] h-[40px] border-[2px] border-[#555656] rounded-[10px]">
                <input
                  type="file"
                  id="image2"
                  className="w-[100%] text-[15px] px-[10px]"
                  required
                  onChange={handleImage2}
                />
              </div>
            </div> */}

            {/* <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
              <label htmlFor="image3" className="text-[20px]">
                Image3
              </label>
              <div className="flex items-center justify-start w-[90%] h-[40px] border-[2px] border-[#555656] rounded-[10px]">
                <input
                  type="file"
                  id="image3"
                  className="w-[100%] text-[15px] px-[10px]"
                  required
                  onChange={handleImage3}
                />
              </div>
            </div> */}

            <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
              <label htmlFor="rent" className="text-[20px]">
                Rent
              </label>
              <input
                type="number"
                id="rent"
                className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]"
                required
                placeholder="Rs.____/day"
                onChange={(e) => setRent(e.target.value)}
                value={rent}
              />
            </div>

            <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
              <label htmlFor="city" className="text-[20px]">
                City
              </label>
              <input
                type="text"
                id="city"
                className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]"
                required
                placeholder="city, country"
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
            </div>

            <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
              <label htmlFor="landmark" className="text-[20px]">
                Landmark
              </label>
              <input
                type="text"
                id="landmark"
                className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]"
                required
                onChange={(e) => setLandmark(e.target.value)}
                value={landmark}
              />
            </div>

            <div className="w-[100%] flex items-center justify-center gap-[30px] mt-[20px]">
              <button
                className="px-[10px] py-[10px] bg-[red] text-[white] text-[15px] md:px-[100px] rounded-lg md:text-[18px] text-nowrap"
                style={{ borderRadius: "10px" }}
                onClick={handleUpdateListing}
                disabled={updating}
              >
                {updating ? "updating..." : "Update Listing"}
              </button>

              <button
                className="px-[10px] py-[10px] bg-[red] text-[white] text-[15px] md:px-[100px] rounded-lg md:text-[18px] text-nowrap"
                style={{ borderRadius: "10px" }}
                onClick={handleDeleteListing}
                disabled={deleting}
              >
                {deleting ? "deleting..." : "Delete Listing"}
              </button>
            </div>
          </form>
        </div>
      )}

      {bookingPopup && (
        <div className="w-[100%] min-h-[100%] flex items-center justify-center flex-col gap-[30px] bg-[#ffffffcd] absolute top-[0px] z-[100] p-[20px] backdrop-blur-sm md:flex-row md:gap-[100px]">
          <RxCross2
            className="w-[50px] h-[50px] cursor-pointer absolute top-[5%] left-[20px] rounded-[50%] flex items-center justify-center bg-[red]"
            onClick={() => setBookingPopup(false)}
          />
          <div></div>
          <form
            className="max-w-[450px] w-[90%] h-[450px] overflow-auto bg-[#f3f1f1] p-[20px] rounded-lg flex items-center justify-start flex-col gap-[10px] border-[1px] border-[#dedddd]"
            onSubmit={(e) => e.preventDefault()}
          >
            <h1 className="w-[100%] flex items-center justify-center py-[10px] text-[25px] border-b-[1px] border-[#a3a3a3]">
              Confirm & Book
            </h1>
            <div className="w-[100%] h-[70%] bg-[#00000033] mt-[10px] rounded-lg p-[10px]">
              <h3 className="text-[19px] font-semibold"> Your Trip -</h3>
              <div className="w-[90%] flex items-center justify-start gap-[24px] mt-[20px] md:items-start md:justify-center flex-col md:flex-row">
                <label htmlFor="checkIn" className="text-[18px] md:text-[20px]">
                  checkIn
                </label>
                <input
                  type="date"
                  id="checkIn"
                  className="w-[200px] h-[40px] border-[2px] border-[#555656] rounded-[10px] bg-transparent text-[15px] px-[10px] md:text-[18px]"
                  min={minDate}
                  required
                  onChange={(e) => setCheckIn(e.target.value)}
                  value={checkIn}
                />
              </div>

              <div className="w-[90%] flex items-center justify-start gap-[10px] mt-[20px] md:items-start md:justify-center flex-col md:flex-row">
                <label
                  htmlFor="checkOut"
                  className="text-[18px] md:text-[20px]"
                >
                  checkOut
                </label>
                <input
                  type="date"
                  id="checkOut"
                  className="w-[200px] h-[40px] border-[2px] border-[#555656] rounded-[10px] bg-transparent text-[15px] px-[10px] md:text-[18px]"
                  min={minDate}
                  required
                  onChange={(e) => setCheckOut(e.target.value)}
                  value={checkOut}
                />
              </div>
              <div className="w-[100%] flex items-center justify-center mt-[30px]">
                <button
                  className="px-[10px] py-[10px] bg-[red] text-[white] text-[15px] md:px-[100px] rounded-lg md:text-[18px] text-nowrap"
                  style={{ borderRadius: "10px" }}
                  onClick={() => handleBooking(cardDetails._id)}
                  disabled={booking}
                >
                  {booking ? "Booking..." : "Book Now"}
                </button>
              </div>
            </div>
          </form>

          <div className="max-w-[450px] w-[90%] h-[450px] overflow-auto bg-[#f3f1f1] p-[20px] rounded-lg flex items-center justify-start flex-col gap-[10px] border-[1px] border-[#dedddd]">
            <div className="w-[90%] h-[30%] border-[1px] border-[#dedddd] rounded-lg flex items-center justify-center gap-[8px] p-[20px] overflow-hidden">
              <div className="w-[70px] h-[90px] flex items-center justify-center flex-shrink-0 rounded-lg md:w-[100px] md:h-[100px]">
                <img
                  src={cardDetails.image1}
                  alt="image"
                  className="w-[100%] h-[100%] rounded-lg"
                />
              </div>
              <div className="w-[80%] h-[100px] gap-[5px]">
                <h5 className="w-[90%] truncate">{`IN ${cardDetails.landMark.toUpperCase()}, ${cardDetails.city.toUpperCase()}`}</h5>
                <h5>{cardDetails.category.toUpperCase()}</h5>
                <h5 className="flex items-center justify-start gap-[5px]">
                  <FaStar className="text-[#eb6262]" />
                  {cardDetails.ratings}
                </h5>
              </div>
            </div>
            <div className="w-[95%] h-[70%] border-[1px] border-[#dedddd] rounded-lg flex items-start justify-start gap-[15px] p-[20px] flex-col">
              <h3 className="text-[22px] font-semibold">Booking Price -</h3>
              <p className="w-[100%] flex justify-between items-center px-[20px]">
                <span className="font-semibold">
                  &#8377;{`${cardDetails.rent} X ${night} nights`}
                </span>
                <span>{cardDetails.rent * night}</span>
              </p>

              <p className="w-[100%] flex justify-between items-center px-[20px]">
                <span className="font-semibold">Tax</span>
                <span>{(cardDetails.rent * 7) / 100}</span>
              </p>

              <p className="w-[100%] flex justify-between items-center px-[20px] border-b-[1px] border-gray-500 pb-[10px]">
                <span className="font-semibold">Airbnb Charge</span>
                <span>{(cardDetails.rent * 7) / 100}</span>
              </p>

              <p className="w-[100%] flex justify-between items-center px-[20px]">
                <span className="font-semibold">Total Price</span>
                <span>{total}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCard;
