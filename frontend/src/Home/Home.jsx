import React from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { useContext } from "react";
import { listingDataContext } from "../context/ListingContext";

const Home = () => {
  const { listingData, setListingData, newListingData } =
    useContext(listingDataContext);
  return (
    <>
      <div>
        <Navbar />
        <div className="w-auto h-auto flex items-center justify-center gap-[25px] flex-wrap mt-[300px] md:mt-[200px]">
          {newListingData.map((list, idx) => (
            <Card key={idx} list={list} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
