import { User } from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"
export const register = async (req, res) => {
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body;
        if (!fullname || !password || !username || !confirmPassword || !gender) {
            return res.status(400).json({ message: "All fields  are rewuired " })
        }
        if (!password === confirmPassword) {
            return res.status(400).json({ message: "Passwod does not match" })
        }
        const user = await User.findOne({ username })
        if (user) {
            return res.status(400).json({ message: "Username already registered try another name " })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        //profile photo

        const maleProfilePhoto = "https://avatar.iran.liara.run/public/boy?username=${username}"
        const femaleProfilePhoto = "https://avatar.iran.liara.run/public/girl?username=${username}"
        await User.create({
            fullname,
            username,
            password: hashedPassword,
            profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
            gender
        });
        return res.status(201).json({
            message: "Account created successfully",
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "username and  password is required" })
        }
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({
                message: "user not found",
                success: "false"
            })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Password does not match",
                success: "false"
            })
        }
        //now we have to generate a token to make sure the user is logged in or not
        const tokenData = {
            userId: user._id
        }
        const token = jwt
            .sign(tokenData,
                process.env.JWT_SECRET_KEY,
                { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
        //now we have to store token at browser cookie
        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
                httpOnly: true,
                secure: true,           // Must be true for HTTPS (Render uses HTTPS)
                sameSite: "none",       // Must be 'none' for cross-origin cookies
            })
            .json({
                _id: user._id,
                username: user.username,
                fullname: user.fullname,
                profilePhoto: user.profilePhoto,
            });




    } catch (error) {
        console.log("error in login catch");

    }
}

export const logoutUser = (req, res) => {
    try {
        return res
  .status(200)
  .cookie("token", "", {
    maxAge: 0,
    httpOnly: true,
    secure: true,
    sameSite: "none",
  })
  .json({
    message: "Logged out successfully",
  });


    } catch (error) {
        console.log(error, "Error at logout catch block");

    }
}
export const getOtherUser = async (req, res) => {
    try {
        const loggedInUserId = req.id;
        const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")
        return res.status(200).json(otherUsers);

    } catch (error) {
        console.log(error, "Error at get other user");

    }
}