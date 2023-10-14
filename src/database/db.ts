import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoDB_URL = process.env.DATABASE_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDB_URL as string);
    console.log("Mongo DB Connected!");
  } catch (error: any) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;
