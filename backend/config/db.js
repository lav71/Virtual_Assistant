import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB connected");
  } catch (error) {
    console.log("DB connection error:", error.message);
  }
};

export default connectDB;