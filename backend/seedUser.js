import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { User } from "./models/userModel.js";

dotenv.config();

const createTestUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "YoutubeMernSocial",
    });

    const existingUser = await User.findOne({ email: "test@example.com" });
    if (existingUser) {
      console.log("Test user already exists!");
      console.log("Email: test@example.com");
      console.log("Password: password123");
      process.exit(0);
    }

    const hashPassword = await bcrypt.hash("password123", 10);

    const user = await User.create({
      name: "Test User",
      email: "test@example.com",
      password: hashPassword,
      gender: "male",
      profilePic: {
        id: "default",
        url: "https://via.placeholder.com/150",
      },
    });

    console.log("Test user created successfully!");
    console.log("Email: test@example.com");
    console.log("Password: password123");
    process.exit(0);
  } catch (error) {
    console.error("Error creating test user:", error);
    process.exit(1);
  }
};

createTestUser();
