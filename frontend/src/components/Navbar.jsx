import React, { useContext, useEffect, useState } from "react";
import { IoCompassOutline } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { MdWhatshot } from "react-icons/md";
import { GiFamilyHouse } from "react-icons/gi";
import { MdBedroomParent } from "react-icons/md";
import { MdOutlinePool } from "react-icons/md";
import { GiWoodCabin } from "react-icons/gi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoBedOutline } from "react-icons/io5";
import { FaTreeCity } from "react-icons/fa6";
import { BiBuildingHouse } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { userDataContext } from "../context/UserContext";
import { listingDataContext } from "../context/ListingContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const [popup, setPopup] = useState(false);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);
  const [cate, setCate] = useState();
  const {
    listingData,
    setListingData,
    newListingData,
    setNewListingData,
    searchData,
    handleSearch,
    handleViewCard,
  } = useContext(listingDataContext);
  const { userData, setUserData } = useContext(userDataContext);

  const handleLogout = async () => {
    try {
      let res = await axios.post(serverUrl + "/api/user/logout", {
        withCredentials: true,
      });
      setUserData(null);
      console.log(res.data);
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error in handleLogout:- ", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  const handleCategory = (category) => {
    setCate(category);
    if (category == "trending") {
      setNewListingData(listingData);
    } else {
      setNewListingData(
        listingData.filter((list) => list.category == category)
      );
    }
  };

  const handleClick = (id) => {
    if (userData) {
      handleViewCard(id);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    handleSearch(input);
  }, [input]);

  return (
    <>
      <div className="fixed top-0 bg-[white] z-50">
        <div className="w-[100vw] min-h-[80px] border-b-[1px] border-[#dcdcdc] px-[20px] flex items-center justify-between md:px-[40px]">
          <div className="flex items-center justify-center gap-2">
            <IoCompassOutline className="size-9 text-red-500" />
            <span className="text-red-500 text-2xl font-bold">TravelNext</span>
          </div>

          {/* <div className="w-[100%] h-[60px] flex items-center justify-center md:block"> */}
          <div className="w-[35%] relative hidden md:block">
            <input
              type="text"
              className="w-[100%] px-[30px] py-[10px] border-[2px] border-[#bdbaba] outline-none overflow-auto rounded-[30px] text-[17px]"
              placeholder="Any Where | Any Location | Any City"
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
            <button
              className="absolute p-[10px] rounded-[50px] bg-[red] right-[3%] top-[5px]"
              style={{ borderRadius: "50px" }}
            >
              <IoSearchSharp className="w-[20px] h-[20px] text-[white]" />
            </button>
          </div>
          {/* </div> */}

          <div className="flex items-center justify-center gap-[10px] relative z-50">
            <span
              className="text-[18px] cursor-pointer rounded-[50px] hover:bg-[#ded9d9] px-[8px] py-[5px] md:block hidden"
              onClick={() => navigate("/listingpage1")}
            >
              List your Home
            </span>
            <button
              className="px-[20px] py-[10px] flex items-center justify-center gap-[5px] border-[1px] border-[#8d8c8c] rounded-[50px] hover:shadow-lg z-50"
              style={{ borderRadius: "50px" }}
              onClick={() => setPopup(!popup)}
            >
              <span>
                <GiHamburgerMenu className="w-[20px] h-[20px]" />
              </span>

              {userData == null && (
                <span>
                  <CgProfile className="w-[23px] h-[23px]" />
                </span>
              )}
              {userData !== null && (
                <span className="w-[30px] h-[30px] bg-[#080808] text-[white] rounded-full flex items-center justify-center">
                  {userData?.name.slice(0, 1).toUpperCase()}
                </span>
              )}
            </button>
            {popup ? (
              <div className="w-[220px] h-[250px] absolute bg-slate-50 top-[110%] right-[3%] border-[1px] border-[#aaa9a9] z-10 rounded-lg">
                <ul className="w-[100%] h-[100%] text-[17px] flex items-center justify-around flex-col py-[10px] px-0 md:right-[10%]">
                  {!userData && (
                    <li
                      className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer"
                      onClick={() => {
                        navigate("/login");
                        setPopup(false);
                      }}
                    >
                      Login
                    </li>
                  )}
                  {userData && (
                    <li
                      className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer"
                      onClick={() => {
                        handleLogout();
                        setPopup(false);
                        navigate("/login");
                      }}
                    >
                      Logout
                    </li>
                  )}
                  <div className="w-[100%] h-[1px] bg-[#c1c0c0]"></div>
                  <li
                    className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer"
                    onClick={() => {
                      navigate("/listingpage1");
                      setPopup(false);
                    }}
                  >
                    List your Home
                  </li>
                  <li
                    className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer"
                    onClick={() => {
                      navigate("/mylisting");
                      setPopup(false);
                    }}
                  >
                    My Listing
                  </li>
                  <li
                    className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer"
                    onClick={() => {
                      navigate("/mybooking");
                      setPopup(false);
                    }}
                  >
                    My Booking
                  </li>
                </ul>
              </div>
            ) : null}
          </div>

          {searchData?.length > 0 && (
            <div className="w-[100vw] h-[450px] flex flex-col gap-[20px] absolute top-[50%] overflow-auto left-0 justify-start items-center">
              <div className="max-w-[500px] w-[100vw] h-[300px] overflow-hidden flex flex-col bg-[#fefdfd] p-[20px] rounded-lg border-[#a2a1a1] cursor-pointer">
                {searchData.map((search, idx) => (
                  <div
                    className="border-b border-[black] p-[10px]"
                    onClick={() => handleClick(search._id)}
                    key={idx}
                  >
                    {search.title} in {search.landMark}, {search.city}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="w-[100%] h-[60px] flex items-center justify-center md:hidden">
          <div className="w-[80%] relative">
            <input
              type="text"
              className="w-[100%] px-[30px] py-[10px] border-[2px] border-[#bdbaba] outline-none overflow-auto rounded-[30px] text-[17px]"
              placeholder="Any Where | Any Location | Any City"
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
            <button
              className="absolute p-[10px] rounded-[50px] bg-[red] right-[3%] top-[5px]"
              style={{ borderRadius: "50px" }}
            >
              <IoSearchSharp className="w-[20px] h-[20px] text-[white]" />
            </button>
          </div>
        </div>

        <div className="w-[100vw] h-[85px] bg-white flex items-center justify-start cursor-pointer gap-[40px] overflow-auto md:justify-center px-[15px] mt-3">
          <div
            className="flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px]"
            onClick={() => {
              handleCategory("trending");
              setCate("");
            }}
          >
            <MdWhatshot className="w-[27px] h-[27px] text-black" />
            <h4>Trending</h4>
          </div>

          <div
            className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${
              cate == "villa" ? "border-b-[1px] border-[#a6a5a5]" : ""
            }`}
            onClick={() => handleCategory("villa")}
          >
            <GiFamilyHouse className="w-[27px] h-[27px] text-black" />
            <h4>Villa</h4>
          </div>
          <div
            className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${
              cate == "farmHouse" ? "border-b-[1px] border-[#a6a5a5]" : ""
            }`}
            onClick={() => handleCategory("farmHouse")}
          >
            <MdBedroomParent className="w-[27px] h-[27px] text-black" />
            <h4>Farm House</h4>
          </div>
          <div
            className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${
              cate == "poolHouse" ? "border-b-[1px] border-[#a6a5a5]" : ""
            }`}
            onClick={() => handleCategory("poolHouse")}
          >
            <MdOutlinePool className="w-[27px] h-[27px] text-black" />
            <h4>Pool House</h4>
          </div>
          <div
            className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${
              cate == "rooms" ? "border-b-[1px] border-[#a6a5a5]" : ""
            }`}
            onClick={() => handleCategory("rooms")}
          >
            <GiWoodCabin className="w-[27px] h-[27px] text-black" />
            <h4>Rooms</h4>
          </div>
          <div
            className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${
              cate == "flat" ? "border-b-[1px] border-[#a6a5a5]" : ""
            }`}
            onClick={() => handleCategory("flat")}
          >
            <SiHomeassistantcommunitystore className="w-[27px] h-[27px] text-black" />
            <h4>Flat</h4>
          </div>
          <div
            className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${
              cate == "pg" ? "border-b-[1px] border-[#a6a5a5]" : ""
            }`}
            onClick={() => handleCategory("pg")}
          >
            <IoBedOutline className="w-[27px] h-[27px] text-black" />
            <h4>PG</h4>
          </div>
          <div
            className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${
              cate == "cabins" ? "border-b-[1px] border-[#a6a5a5]" : ""
            }`}
            onClick={() => handleCategory("cabins")}
          >
            <FaTreeCity className="w-[27px] h-[27px] text-black" />
            <h4>Cabins</h4>
          </div>
          <div
            className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${
              cate == "shops" ? "border-b-[1px] border-[#a6a5a5]" : ""
            }`}
            onClick={() => handleCategory("shops")}
          >
            <BiBuildingHouse className="w-[27px] h-[27px] text-black" />
            <h4>Shops</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
