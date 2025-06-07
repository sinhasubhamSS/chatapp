
import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/databse/database.js";
import userRoutes from "./src/routes/userRoutes.js";
import messageRoute from "./src/routes/messageRoute.js";
import cookieParser from "cookie-parser";
import { urlencoded } from "express";
import cors from "cors";
import { server, app } from "./src/socket/socket.js";

dotenv.config();

const PORT = process.env.PORT;

if (!PORT) {
    console.error("❌ Error: PORT environment variable is not set.");
    process.exit(1);
}

console.log("✅ PORT environment variable:", PORT);

// Middleware
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "https://chatapp-c4lh3lbma-sinhasubhamss-projects.vercel.app/", // or your frontend URL on Render
    credentials: true,
}));

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/message", messageRoute);

// Connect DB and start server
connectDB()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`🚀 Server listening at port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("❌ Database connection failed:", error);
        process.exit(1);
    });
