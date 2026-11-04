import mongoose from "mongoose";
import { logger } from "./logger";

export async function connectDB(): Promise<void> {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/decentra-social";

  try {
    await mongoose.connect(uri);
    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error("MongoDB connection failed:", error);
    process.exit(1);
  }

  mongoose.connection.on("error", (err) => {
    logger.error("MongoDB connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    logger.warn("MongoDB disconnected");
  });
}
