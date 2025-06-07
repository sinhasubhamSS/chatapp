import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URL);
    console.log(`\nMongoDB connected! Host: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MONGODB connection Failed", error);
    process.exit(1);
  }
};

export default connectDB;
