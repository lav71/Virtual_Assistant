import React, { useState, useContext } from "react";
import bg from "../images/ai1.jpg";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext.jsx";
import axios from "axios";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { serverUrl, userData, setUserData } = useContext(userDataContext);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      setUserData(result.data);
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setUserData(null);
      setLoading(false);
      setError(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div
      className="w-full min-h-screen bg-cover bg-no-repeat bg-center flex justify-center items-center px-4 py-6"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        className="w-full max-w-[500px] min-h-[600px] bg-[#00000069] backdrop-blur-md shadow-lg shadow-blue-950 flex flex-col items-center justify-center gap-[20px] p-6 sm:p-[30px] rounded-2xl"
        onSubmit={handleSignUp}
      >
        <h1 className="text-white text-[25px] sm:text-[30px] font-semibold text-center mb-[20px] sm:mb-[30px]">
          Register to{" "}
          <span className="text-blue-400">Virtual Assistant</span>
        </h1>

        <input
          type="text"
          placeholder="Enter your Name"
          className="w-full h-[55px] sm:h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[16px] sm:text-[18px]"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <input
          type="email"
          placeholder="Enter your E-mail"
          className="w-full h-[55px] sm:h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[16px] sm:text-[18px]"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <div className="w-full h-[55px] sm:h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[16px] sm:text-[18px] relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full h-full outline-none bg-transparent placeholder-gray-300 px-[20px] py-[10px] pr-[55px]"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          {showPassword ? (
            <IoMdEyeOff
              className="absolute top-[15px] sm:top-[18px] right-[18px] sm:right-[20px] text-white w-[23px] sm:w-[25px] h-[23px] sm:h-[25px] cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <IoMdEye
              className="absolute top-[15px] sm:top-[18px] right-[18px] sm:right-[20px] text-white w-[23px] sm:w-[25px] h-[23px] sm:h-[25px] cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>

        {Error.length > 0 && (
          <p className="text-red-500 text-[14px] sm:text-[16px] text-center">
            *{Error}
          </p>
        )}

        <button
          type="submit"
          className="w-full sm:w-auto min-w-[150px] h-[55px] sm:h-[60px] mt-[20px] sm:mt-[30px] px-[25px] text-black font-semibold bg-white rounded-full text-[17px] sm:text-[19px] cursor-pointer"
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>

        <p
          className="text-white text-[15px] sm:text-[18px] text-center cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Already have an account ?{" "}
          <span className="text-blue-400">Log In</span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;