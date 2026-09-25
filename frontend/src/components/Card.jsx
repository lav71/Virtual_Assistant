import React, { useContext } from "react";
import { userDataContext } from "../context/UserContext.jsx";

const Card = ({ image }) => {

  const {
    selectedImage,
    setSelectedImage,
    setBackendImage,
    setFrontendImage
  } = useContext(userDataContext);

  return (
    <div
      className={`w-[130px] h-[210px] sm:w-[140px] sm:h-[230px] md:w-[150px] md:h-[250px] bg-[#030326] border-2 border-[blue] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white ${
        selectedImage == image
          ? "border-4 border-white shadow-2xl shadow-blue-950"
          : null
      }`}
      onClick={() => {
        setSelectedImage(image);
        setBackendImage(null);
        setFrontendImage(null);
      }}
    >
      <img
        src={image}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Card;