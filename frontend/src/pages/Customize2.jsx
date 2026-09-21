import React from "react";
import { useContext } from "react";
import { userDataContext } from "../context/userContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Customize2 = () => {

    const {
        userData,
        backendImage,
        selectedImage,
        serverUrl,
        setUserData
    } = useContext(userDataContext);

    const navigate = useNavigate();
    const [assistantName, setAssistantName] = React.useState(
        userData?.assistantName || ""
    );

    const [loading, setLoading] = React.useState(false);

    const handleUpdateAssistant = async () => {
        try {

            setLoading(true);

            let formData = new FormData()

            formData.append("assistantName", assistantName);

            if (backendImage) {
                formData.append("assistantImage", backendImage);
            } else {
                formData.append("imageUrl", selectedImage);
            }

            const result = await axios.post(
                `${serverUrl}/api/user/update`,
                formData,
                {
                    withCredentials: true
                }
            );

            setLoading(false);
            console.log(result.data);

            setUserData(result.data);
            navigate("/");

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-t from-black to-[#020236] flex flex-col justify-center items-center px-4 py-10 relative">

            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center">
                Enter Your{" "}
                <span className="text-blue-500">
                    Assistant Name
                </span>
            </h1>

            <input
                type="text"
                placeholder="e.g. Jarvis"
                className="w-full max-w-[600px] h-[55px] sm:h-[60px] mt-[30px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[16px] sm:text-[18px]"
                required
                onChange={(e) => setAssistantName(e.target.value)}
                value={assistantName}
            />

            {assistantName && 
                <button
                    className="w-full sm:w-auto min-w-[150px] h-[55px] sm:h-[60px] mt-[30px] px-[25px] text-black font-semibold bg-white rounded-full text-[17px] sm:text-[19px] cursor-pointer"
                    disabled={loading}
                    onClick={() => {
                        handleUpdateAssistant();
                    }}
                >
                    {!loading ? "Create your Assistant" : "Loading..."}
                </button>
            }

        </div>
    );
};

export default Customize2;