import express from "express"
import { getOtherUser, loginUser, logoutUser, register } from "../controllers/userController.js"
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();
router.route("/register").post(register)
router.route("/login").post(loginUser)
router.route("/logout").get(logoutUser)
router.route("/").get(isAuthenticated,getOtherUser)
export default router