const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

console.log("MongoDB URI:", process.env.MONGO_URI);


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;