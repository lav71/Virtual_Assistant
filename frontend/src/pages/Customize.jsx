import { BiImageAdd } from "react-icons/bi";
import { useContext, useRef } from "react";
import Card from "../components/Card";
import { userDataContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

import image1 from "../images/image1.png";
import image2 from "../images/image2.png";
import image3 from "../images/image3.jpg";
import image4 from "../images/image4.jpeg";
import image5 from "../images/image5.jpeg";
import image6 from "../images/image6.png";
import image7 from "../images/image7.jpeg";

function Customize() {
  const {
    serverUrl,
    userData,
    setUserData,
    loading,
    backendImage,
    setBackendImage,
    frontendImage,
    setFrontendImage,
    selectedImage,
    setSelectedImage
  } = useContext(userDataContext);

  const inputImage = useRef();
  const navigate = useNavigate();

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setBackendImage(file);
      setFrontendImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-black to-[#020236] flex flex-col items-center sm:py-3 px-2">

      <div className="text-center mb-8 sm:mb-10">

        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">
          Customize Your <span className="text-blue-500">Assistant</span>
        </h1>

        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Choose your favorite AI assistant
        </p>

      </div>

      <div className="w-full max-w-[1000px] flex justify-center items-center flex-wrap gap-4 sm:gap-5 md:gap-6">

        <Card image={image1} />
        <Card image={image2} />
        <Card image={image3} />
        <Card image={image4} />
        <Card image={image5} />
        <Card image={image6} />
        <Card image={image7} />

        <div
          className={`w-[120px] h-[200px] sm:w-[140px] sm:h-[230px] md:w-[150px] md:h-[250px] bg-[#030326] border-2 border-[blue] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white flex items-center justify-center ${
            selectedImage == "input"
              ? "border-4 border-white shadow-2xl shadow-blue-950"
              : null
          }`}
          onClick={() => {
            inputImage.current.click();
            setSelectedImage("input");
          }}
        >
          {!frontendImage && (
            <BiImageAdd className="text-white w-[25px] h-[25px] sm:w-[30px] sm:h-[30px]" />
          )}

          {frontendImage && (
            <img
              src={frontendImage}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          ref={inputImage}
          hidden
          onChange={handleImage}
        />

      </div>

      {selectedImage && (
        <button
          className="min-w-[130px] sm:min-w-[150px] h-[50px] sm:h-[60px] mt-[30px] text-black font-semibold bg-white rounded-full text-[16px] sm:text-[19px] cursor-pointer px-6"
          onClick={() => navigate("/customize2")}
        >
          Next
        </button>
      )}

    </div>
  );
}

export default Customize;