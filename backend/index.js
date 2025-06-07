import express from "express";
import dotenv from "dotenv"
import connectDB from "./src/databse/database.js";
import userRoutes from "./src/routes/userRoutes.js"
import cookieParser from "cookie-parser";
import messageRoute from "./src/routes/messageRoute.js"
import { urlencoded } from "express";
import cors from "cors"
import { server, app } from "./src/socket/socket.js";
dotenv.config({})
const PORT = process.env.PORT || 5000
//middleware
console.log("PORT environment variable:", process.env.PORT);


app.use(urlencoded({
    extended: true
}))
app.use(express.json())
app.use(cookieParser())
const corsOption = {
    origin: "http://localhost:5173",
    credentials: true
};
app.use(cors(corsOption))
//rotes
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/message', messageRoute)
//http://localhost:8080/api/v1/user/register
connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`Server listening at port ${PORT}`);
    });
}).catch((error) => {
    console.error('Database connection failed:', error);
    process.exit(1); // Exit the process if the database connection fails
});




