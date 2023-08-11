import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    if (mongoose.connections[0].readyState) return; // If already connected, exit early.

    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    return db; // Return the database connection object.
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    throw error;
  }
};

export default dbConnect;
