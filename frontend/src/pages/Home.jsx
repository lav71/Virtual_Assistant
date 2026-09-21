import React, { useContext, useEffect } from "react";
import { userDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useRef } from "react";
import aiImg from "../images/ai.gif";
import userImg from "../images/user.gif";
import { IoMdMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const Home = () => {
  const { userData, serverUrl, setUserData, getGeminiResponse } =
    useContext(userDataContext);
  const navigate = useNavigate();
  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");
  const [listening, setListeninig] = useState(false);
  const isSpeakingRef = useRef(false);
  const recognitionRef = useRef(null);
  const isRecognizingRef = useRef(false);
  const isProcessingRef = useRef(false);
  const [ham, setHam] = useState(false);
  const synth = window.speechSynthesis;

  const handleLogOut = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        },
      );

      console.log(result.data);

      setUserData(null);
      navigate("/login");
    } catch (error) {
      console.log("Logout Error:", error);
    }
  };

  const startRecognition = () => {
    const recognition = recognitionRef.current;

    if (
      !recognition ||
      isRecognizingRef.current ||
      isSpeakingRef.current ||
      isProcessingRef.current
    ) {
      return;
    }

    try {
      recognition.start();
    } catch (error) {
      // Already started hone par error ignore karo
      if (error.name !== "InvalidStateError") {
        console.error("Recognition start error:", error);
      }
    }
  };

  const speak = (text) => {
    if (!text) return;

    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "hi-IN";

    const voices = synth.getVoices();
    const hindiVoice = voices.find((voice) => voice.lang === "hi-IN");

    if (hindiVoice) {
      utterance.voice = hindiVoice;
    }

    isSpeakingRef.current = true;

    utterance.onend = () => {
      setAiText("");
      isSpeakingRef.current = false;
      isProcessingRef.current = false;

      setTimeout(() => {
        startRecognition();
      }, 500);
    };

    utterance.onerror = () => {
      isSpeakingRef.current = false;
      isProcessingRef.current = false;

      setTimeout(() => {
        startRecognition();
      }, 500);
    };

    synth.speak(utterance);
  };

  const handleCommand = (data) => {
    if (!data) return;

    const { type, userInput, response } = data;

    if (response) {
      speak(response);
    }

    if (type === "google_search") {
      const query = encodeURIComponent(userInput);

      window.open(`https://www.google.com/search?q=${query}`, "_blank");
    }

    if (type === "youtube_search" || type === "youtube_play") {
      const query = encodeURIComponent(userInput);

      window.open(
        `https://www.youtube.com/results?search_query=${query}`,
        "_blank",
      );
    }

    if (type === "facebook_open") {
      window.open("https://www.facebook.com/", "_blank");
    }

    if (type === "instagram_open") {
      window.open("https://www.instagram.com/", "_blank");
    }

    if (type === "weather-show") {
      window.open("https://www.google.com/search?q=weather", "_blank");
    }
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Speech Recognition is not supported");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.maxAlternatives = 1;

    recognitionRef.current = recognition;

    recognition.onstart = () => {
      console.log("Recognition started");

      isRecognizingRef.current = true;
      setListeninig(true);
    };

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript.trim();

      console.log("heard:", transcript);

      const assistantName = userData?.assistantName?.toLowerCase();

      if (!assistantName || !transcript.toLowerCase().includes(assistantName)) {
        return;
      }

      // Abhi command process ho rahi hai
      isProcessingRef.current = true;

      setUserText(transcript);
      setAiText("");

      try {
        const data = await getGeminiResponse(transcript);

        console.log("Gemini Data:", data);

        if (!data) {
          console.log("No response received from assistant");

          isProcessingRef.current = false;

          setTimeout(() => {
            startRecognition();
          }, 500);

          return;
        }

        setUserText("");
        setAiText(data.response || "");

        handleCommand(data);
      } catch (error) {
        console.log("Assistant Error:", error);

        isProcessingRef.current = false;

        setUserText("");
        setAiText("Sorry, something went wrong.");

        setTimeout(() => {
          setAiText("");
          startRecognition();
        }, 1500);
      }
    };

    recognition.onend = () => {
      console.log("Recognition ended");

      isRecognizingRef.current = false;
      setListeninig(false);

      // Agar AI response process kar raha hai
      // to abhi recognition start mat karo
      if (isProcessingRef.current || isSpeakingRef.current) {
        return;
      }

      // Normal listening continue karo
      setTimeout(() => {
        startRecognition();
      }, 500);
    };

    recognition.onerror = (event) => {
      console.warn("Recognition error:", event.error);

      isRecognizingRef.current = false;
      setListeninig(false);

      // aborted ko error mat samjho
      if (event.error === "aborted") {
        return;
      }

      if (
        event.error === "not-allowed" ||
        event.error === "service-not-allowed"
      ) {
        console.error("Microphone permission denied");
        return;
      }

      if (!isProcessingRef.current && !isSpeakingRef.current) {
        setTimeout(() => {
          startRecognition();
        }, 1000);
      }
    };

    // First time recognition start
    setTimeout(() => {
      startRecognition();
    }, 500);

    // IMPORTANT: cleanup
    return () => {
      console.log("Cleaning up recognition");

      isProcessingRef.current = true;

      try {
        recognition.stop();
      } catch (error) {}

      recognitionRef.current = null;
    };
  }, [userData?.assistantName]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-black to-[#020236] flex flex-col items-center px-3 sm:px-4 relative overflow-x-hidden">
      {/* Hamburger - Mobile */}
      {!ham && (
        <IoMdMenu
          className="lg:hidden text-white absolute top-6 right-5 w-7 h-7 cursor-pointer z-[50]"
          onClick={() => setHam(true)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 z-[100] w-[280px] h-screen bg-[#000000dd] backdrop-blur-xl p-6 flex flex-col gap-5 items-start transition-transform duration-300 ${
          ham ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <RxCross2
          className="text-white absolute top-6 right-6 w-8 h-8 cursor-pointer z-[200] cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setHam(false);
          }}
        />

        <div className="mt-14 flex flex-col gap-4 w-full">
          <button
            type="button"
            className="w-full px-5 py-3 text-black font-semibold bg-white rounded-full text-[16px] cursor-pointer hover:bg-blue-500 hover:text-white transition"
            onClick={handleLogOut}
          >
            Log Out
          </button>

          <button
            type="button"
            className="w-full px-5 py-3 text-black font-semibold bg-white rounded-full text-[16px] cursor-pointer hover:bg-blue-500 hover:text-white transition"
            onClick={() => navigate("/customize")}
          >
            Customize Your Assistant
          </button>
        </div>

        <div className="w-full h-[1px] bg-gray-500 mt-2"></div>

        <h1 className="text-white font-semibold text-[19px]">History</h1>

        <div className="w-full flex-1 overflow-y-auto flex flex-col gap-4">
          {userData?.history?.map((his, index) => (
            <span key={index} className="text-gray-200 text-[16px] truncate">
              {his}
            </span>
          ))}
        </div>
      </div>

      {/* Desktop Buttons */}
      <div className="hidden lg:flex w-full justify-end items-center gap-4 pt-6 pr-6">
        <button
          type="button"
          className="px-7 py-3 text-black font-semibold bg-white rounded-full text-[17px] cursor-pointer hover:bg-blue-500 hover:text-white transition"
          onClick={handleLogOut}
        >
          Log Out
        </button>

        <button
          type="button"
          className="px-7 py-3 text-black font-semibold bg-white rounded-full text-[17px] cursor-pointer hover:bg-blue-500 hover:text-white transition"
          onClick={() => navigate("/customize")}
        >
          Customize Your Assistant
        </button>
      </div>

      {/* Main Assistant Section */}
      <div className="w-full flex-1 flex flex-col items-center justify-center pt-4 sm:pt-6 pb-8 px-2">
        {/* Assistant Image */}
        <img
          src={userData?.assistantImage}
          alt="Assistant"
          className="w-[65vw] max-w-[280px] h-auto aspect-[5/6] object-cover rounded-[30px] border-2 border-cyan-400 shadow-[0_0_30px_rgba(0,180,255,0.35)]"
        />

        {/* Assistant Name */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4 text-center break-words max-w-full">
          I'm {userData?.assistantName}
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-lg lg:text-xl text-gray-400 mt-2 text-center">
          Your Personal Virtual Assistant
        </p>

        {/* GIF */}
        {!aiText && (
          <img
            src={aiImg}
            alt="AI"
            className="w-[90px] sm:w-[110px] lg:w-[140px] mt-4 mx-auto"
          />
        )}
      </div>
    </div>
  );
};

export default Home;
