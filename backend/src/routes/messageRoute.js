import express from "express"
import { getMessage, sendmessage } from "../controllers/messargeController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";


const router=express.Router();
router.route("/send/:id").post(isAuthenticated,sendmessage)
router.route("/:id").get(isAuthenticated,getMessage)

export default router