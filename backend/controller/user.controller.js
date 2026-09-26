import User from "../models/user.model.js";
import uploadOnCloudinary from "../config/cloudinary.js";
import groqResponse from "../groq.js";
import moment from "moment";

export const getCurrentUser = async (req, res) => {
  try {
    const user_id = req.user_id;

    const user = await User.findById(user_id).select("-password");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Get current user error",
    });
  }
};

export const updateAssistant = async (req, res) => {
  try {
    console.log("========== UPDATE ASSISTANT ==========");
    console.log("User ID:", req.user_id);
    console.log("Body:", req.body);
    console.log("File:", req.file);
    const { assistantName, imageUrl } = req.body;

    if (!assistantName || !assistantName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Assistant name is required",
      });
    }

    let assistantImage = imageUrl || "";

    if (req.file) {
      assistantImage = await uploadOnCloudinary(req.file.buffer);
    }

    if (!assistantImage) {
      return res.status(400).json({
        success: false,
        message: "Assistant image is required",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user_id,
      {
        assistantName: assistantName.trim(),
        assistantImage,
      },
      {
        new: true,
        runValidators: true,
      },
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("Assistant updated successfully");

    return res.status(200).json({
      success: true,
      message: "Assistant updated successfully",
      user,
    });
  } catch (error) {
    console.error("========== UPDATE ASSISTANT ERROR ==========");
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);
    console.error("UPDATE ASSISTANT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Update Assistant Error",
    });
  }
};

export const askToAssistant = async (req, res) => {
  try {
    const { command } = req.body;

    if (!command) {
      return res.status(400).json({
        response: "Command is required",
      });
    }

    const user = await User.findById(req.user_id);

    if (!user) {
      return res.status(404).json({
        response: "User not found",
      });
    }

    user.history.push(command);
    await user.save();

    const userName = user.name;
    const assistantName = user.assistantName;

    const result = await groqResponse(
      command,
      assistantName,
      userName
    );

    console.log("Groq Result:", result);

    let aiResult;

    try {
      aiResult = JSON.parse(result);
    } catch (error) {
      console.error("Invalid Groq JSON:", result);

      return res.status(400).json({
        response: "Sorry, I can't understand",
      });
    }

    const type = aiResult.type;

    switch (type) {
      case "get_date":
        return res.json({
          type,
          userInput: aiResult.userInput,
          response: `Current date is ${moment().format("YYYY-MM-DD")}`,
        });

      case "get_time":
        return res.json({
          type,
          userInput: aiResult.userInput,
          response: `Current time is ${moment().format("hh:mm A")}`,
        });

      case "get_day":
        return res.json({
          type,
          userInput: aiResult.userInput,
          response: `Today is ${moment().format("dddd")}`,
        });

      case "get_month":
        return res.json({
          type,
          userInput: aiResult.userInput,
          response: `Current month is ${moment().format("MMMM")}`,
        });

      case "google_search":
      case "youtube_search":
      case "youtube_play":
      case "general":
      case "calculator_open":
      case "facebook_open":
      case "instagram_open":
      case "weather-show":
        return res.json({
          type,
          userInput: aiResult.userInput,
          response: aiResult.response,
        });

      default:
        return res.status(400).json({
          response: "I didn't understand this command.",
        });
    }
  } catch (error) {
    console.error(
      "Ask assistant error:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      response: "Ask assistant error",
    });
  }
};