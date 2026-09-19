import mongoose from "mongoose";


type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  // Already connected
  if (connection.isConnected === 1) {
    console.log("✅ MongoDB: Already connected");
    return;
  }

  // Check environment variable
  if (!process.env.MONGODB_URI) {
    throw new Error("❌ MONGODB_URI is not defined");
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);

    connection.isConnected = db.connections[0].readyState;

    console.log("✅ MongoDB: Connected successfully");
    console.log("📊 Database:", db.connection.name);
    console.log("🔗 Host:", db.connection.host);
  } catch (error) {
    connection.isConnected = 0;

    console.error("❌ MongoDB connection failed:", error);

    throw error;
  }
}

export default dbConnect;