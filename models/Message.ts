import mongoose, { Document, Model, Schema } from 'mongoose';

interface IMessage extends Document {
  text: string;
  createdAt: Date;
}   

const MessageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
 })
 export default mongoose.models.Message || mongoose.model('Message', MessageSchema);