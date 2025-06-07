import { Conversation } from "../models/conversatiomModel.js";
import { Message } from "../models/messageModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendmessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const { message } = req.body;

        let gotconversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },

        })
        if (!gotconversation) {
            gotconversation = await Conversation.create({
                participants: [senderId, receiverId]

            })
        }
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message,

        });
        if (newMessage) {
            gotconversation.messages.push(newMessage._id)
        };
        // await gotconversation.save();
        await Promise.all([!gotconversation.save(), newMessage.save()])

        //SOCKET IO
        const receiverSocketId = getReceiverSocketId(receiverId)
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);

        }
        return res.status(201).json({
            newMessage
        })
    } catch (error) {
        console.log("Error at sendmessage catch block");

    }
}
export const getMessage = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.id;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages")//this will display the message from the id 
        return res.status(200).json(conversation?.messages)

    } catch (error) {
        console.log("Error at getmessage catch block", error);

    }
}