import React, { useContext } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
import Card from "../components/Card";

const MyBooking = () => {
  const navigate = useNavigate();
  const { userData } = useContext(userDataContext);
  return (
    <div className="w-[100vw] min-h-[100vh] flex items-center justify-start gap-[50px] flex-col relative">
      <div
        className="w-[50px] h-[50px] cursor-pointer absolute top-[1%] left-[20px] rounded-[50%] flex items-center justify-center bg-[red]"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft className="w-[25px] h-[25px] text-[white]" />
      </div>

      <div className="w-[50%] h-[10%] border-[2px] border-[#908c8c] p-[15px] flex items-center justify-center text-[30px] rounded-md text-[#613b3b] font-semibold mt-[20px] md:w-[600px]">
        MY BOOKING
      </div>

      <div className="w-[100%] h-[90%] flex items-center justify-center gap-[25px] flex-wrap mt-[30px]">
        {userData.booking.map((list, idx) => (
          <Card key={idx} list={list} />
        ))}
      </div>
    </div>
  );
};

export default MyBooking;
