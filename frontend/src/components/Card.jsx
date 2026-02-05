import React, { useContext, useState } from "react";
import { userDataContext } from "../context/UserContext";
import { listingDataContext } from "../context/ListingContext";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { FcCancel } from "react-icons/fc";
import { bookingDataContext } from "../context/BookingContext";

const Card = ({ list }) => {
  // console.log(list);
  const [popUp, setPopUp] = useState(false);
  const navigate = useNavigate();
  const { userData } = useContext(userDataContext);
  const { handleViewCard } = useContext(listingDataContext);
  const { cancelBooking } = useContext(bookingDataContext);

  const handleClick = () => {
    if (userData) {
      handleViewCard(list._id);
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      <div
        className="h-[460px] w-[330px] max-w-[85%] flex items-start justify-start flex-col rounded-lg cursor-pointer relative"
        onClick={() => (!list.isBooked ? handleClick() : null)}
      >
        {list.isBooked && (
          <div className="text-[green] bg-white rounded-lg absolute flex items-center justify-center right-1 top-1 gap-[5px] p-[5px]">
            <GiConfirmed className="h-[20px] w-[20px]" />
            Booked
          </div>
        )}
        {list.isBooked && list.host == userData?._id && (
          <div
            className="text-[red] bg-white rounded-lg absolute flex items-center justify-center right-1 top-[50px] gap-[5px] p-[5px]"
            onClick={() => setPopUp(!popUp)}
          >
            <FcCancel className="h-[20px] w-[20px]" />
            Cancel
          </div>
        )}
        {popUp && (
          <div className="w-[300px] h-[100px] bg-[#ffffffdf] absolute top-[110px] left-[13px] rounded-lg">
            <div className="w-[100%] h-[50%] text-[#2e2d2d] flex items-start justify-center rounded-lg overflow-auto text-[20px] p-[10px]">
              Booking Cancel!
            </div>
            <div className="w-[100%] h-[50%] text-[#986b6b] flex items-start justify-center text-[18px] gap-[10px] font-semibold">
              Are you sure?{" "}
              <button
                className="px-[20px] bg-[red] text-[white] rounded-lg hover:bg-slate-600"
                style={{ borderRadius: "10px" }}
                onClick={() => {
                  cancelBooking(list._id);
                  setPopUp(false);
                }}
              >
                Yes
              </button>
              <button
                className="px-[10px] bg-[red] text-[white] rounded-lg hover:bg-slate-600"
                style={{ borderRadius: "10px" }}
                onClick={() => setPopUp(!popUp)}
              >
                No
              </button>
            </div>
          </div>
        )}
        <div className="w-[100%] h-[60%] bg-[#2e2d2d] rounded-lg overflow-auto flex">
          <img
            src={list.image1}
            alt="image1"
            className="w-[100%] flex-shrink-0"
          />
          {/* <img
            src={list.image2}
            alt="image2"
            className="w-[100%] flex-shrink-0"
          />
          <img
            src={list.image3}
            alt="image3"
            className="w-[100%] flex-shrink-0"
          /> */}
        </div>
        <div className="w-[100%] h-[33%] py-[20px] flex flex-col gap-[2px]">
          <div className="flex items-center justify-between text-[18px]">
            <span className="w-[80%] text-ellipsis overflow-hidden font-semibold text-nowrap text-[#4a3434]">
              In {list.landMark}, {list.city}
            </span>
            <span className="flex items-center justify-center gap-[5px]">
              <FaStar className="text-[#eb6262]" />
              {list.ratings}
            </span>
          </div>
          <span className="w-[80%] text-[15px] text-ellipsis overflow-hidden text-nowrap">
            {list.title}
          </span>
          <span className="text-[16px] font-semibold text-[#986b6b]">
            &#8377;{list.rent}/day
          </span>
        </div>
      </div>
    </>
  );
};

export default Card;
