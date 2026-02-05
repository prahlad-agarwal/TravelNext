import React, { useContext, useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import axios from "axios";
import { authDataContext } from "../context/AuthContext.jsx";
import { userDataContext } from "../context/UserContext.jsx";
import { toast } from "react-toastify";

const Signup = () => {
  const [eye, setEye] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(authDataContext);
  const { serverUrl } = useContext(authDataContext);
  const { userData, setUserData } = useContext(userDataContext);

  const handleSubmit = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      let res = await axios.post(
        serverUrl + "/api/user/signup",
        {
          name,
          email,
          password,
        },
        { withCredentials: true }
      );
      setLoading(false);
      setUserData(res.data);
      localStorage.setItem("signup userData", JSON.stringify(res.data));
      navigate("/");
      toast.success("Signup Successfully");
      console.log(res);
    } catch (error) {
      console.log("Error in signup.jsx:- ", error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center relative">
      <div
        className="w-[50px] h-[50px] cursor-pointer absolute top-[10%] left-[20px] rounded-[50%] flex items-center justify-center bg-[red]"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft className="w-[25px] h-[25px] text-[white]" />
      </div>
      <form
        action=""
        className="max-w-[900px] w-[90%] h-[600px] flex items-center justify-center flex-col md:items-start gap-[10px]"
        onSubmit={handleSubmit}
      >
        <h1 className="text-[30px]">Welcome to Airbnb</h1>
        <div className="w-[90%] flex items-start justify-start flex-col gap-[10px] mt-[30px]">
          <label htmlFor="name" className="text-[20px]">
            UserName
          </label>
          <input
            type="text"
            id="name"
            className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
        </div>
        <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
          <label htmlFor="email" className="text-[20px]">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>
        <div className="w-[90%] flex items-start justify-start flex-col gap-[10px] relative">
          <label htmlFor="password" className="text-[20px]">
            Password
          </label>
          <input
            type={eye ? "text" : "password"}
            id="password"
            className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          {!eye ? (
            <IoMdEye
              className="w-[22px] h-[22px] absolute right-[12%] bottom-[10px] cursor-pointer"
              onClick={() => {
                setEye(!eye);
              }}
            />
          ) : (
            <IoEyeOff
              className="w-[22px] h-[22px] absolute right-[12%] bottom-[10px] cursor-pointer"
              onClick={() => {
                setEye(!eye);
              }}
            />
          )}
        </div>
        <button
          className="px-[50px] py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px] rounded-lg mt-[20px]"
          disabled={loading}
        >
          {loading ? "Loading..." : "Signup"}
        </button>
        <p className="text-[18px]">
          Already have a account?
          <span
            className="text-[19px] text-[red] cursor-pointer"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
