import mongoose, { mongo } from "mongoose";

const messageCollection = "Mensaje"

const messageSchema = new mongoose.Schema({
    user: { type: String },
    message: { type: String },
})

const messageModel = mongoose.model(messageCollection, messageSchema)

export default messageModel