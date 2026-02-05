import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { authDataContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const listingDataContext = createContext();

const ListingContext = ({ children }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [frontEndImage1, setFrontEndImage1] = useState(null);
  // const [frontEndImage2, setFrontEndImage2] = useState(null);
  // const [frontEndImage3, setFrontEndImage3] = useState(null);
  const [backEndImage1, setBackEndImage1] = useState(null);
  // const [backEndImage2, setBackEndImage2] = useState(null);
  // const [backEndImage3, setBackEndImage3] = useState(null);
  const [rent, setRent] = useState("");
  const [city, setCity] = useState("");
  const [landmark, setLandmark] = useState("");
  const [category, setCategory] = useState("");
  const [adding, setAdding] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [listingData, setListingData] = useState([]);
  const [newListingData, setNewListingData] = useState([]);
  const [cardDetails, setCardDetails] = useState(null);
  const [searchData, setSearchData] = useState([]);

  const { serverUrl } = useContext(authDataContext);

  const handleAddListing = async () => {
    setAdding(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("image1", backEndImage1);
      // formData.append("image2", backEndImage2);
      // formData.append("image3", backEndImage3);
      formData.append("description", description);
      formData.append("rent", rent);
      formData.append("city", city);
      formData.append("landMark", landmark);
      formData.append("category", category);

      const res = await axios.post(serverUrl + "/api/listing/add", formData, {
        withCredentials: true,
      });
      setAdding(false);
      console.log(res);
      navigate("/");
      toast.success("AddListing Successfully");
      setTitle("");
      setDescription("");
      setFrontEndImage1(null);
      // setFrontEndImage2(null);
      // setFrontEndImage3(null);
      setBackEndImage1(null);
      // setBackEndImage2(null);
      // setBackEndImage3(null);
      setRent("");
      setCity("");
      setLandmark("");
      setCategory("");
    } catch (error) {
      setAdding(false);
      console.log("Error in handleaddlisting:- ", error);
    }
  };

  const handleViewCard = async (id) => {
    try {
      const res = await axios.get(
        serverUrl + `/api/listing/findlistingbyid/${id}`,
        { withCredentials: true }
      );
      console.log(res.data);
      setCardDetails(res.data);
      navigate("/viewcard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (data) => {
    try {
      const res = await axios.get(
        serverUrl + `/api/listing/search?query=${data}`
      );
      setSearchData(res.data);
    } catch (error) {
      setSearchData(null);
    }
  };

  const handleGetListing = async () => {
    try {
      const res = await axios.get(serverUrl + "/api/listing/get", {
        withCredentials: true,
      });
      setListingData(res.data);
      setNewListingData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetListing();
  }, [adding, updating, deleting]);

  const value = {
    title,
    setTitle,
    description,
    setDescription,
    frontEndImage1,
    setFrontEndImage1,
    // frontEndImage2,
    // setFrontEndImage2,
    // frontEndImage3,
    // setFrontEndImage3,
    backEndImage1,
    setBackEndImage1,
    // backEndImage2,
    // setBackEndImage2,
    // backEndImage3,
    // setBackEndImage3,
    rent,
    setRent,
    city,
    setCity,
    landmark,
    setLandmark,
    category,
    setCategory,
    adding,
    setAdding,
    listingData,
    setListingData,
    newListingData,
    setNewListingData,
    cardDetails,
    setCardDetails,
    updating,
    setUpdating,
    deleting,
    setDeleting,
    searchData,
    setSearchData,
    handleGetListing,
    handleAddListing,
    handleViewCard,
    handleSearch,
  };
  return (
    <div>
      <listingDataContext.Provider value={value}>
        {children}
      </listingDataContext.Provider>
    </div>
  );
};

export default ListingContext;
