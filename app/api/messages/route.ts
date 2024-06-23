import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Message from "@/models/Message";

connectDB();

export async function GET() {
    try {
      const messages = await Message.find().sort({ createdAt: -1 });
      return NextResponse.json(messages);
    } catch (error) {
      return NextResponse.json({ message: 'Server error', error }, { status: 500 });
    }
  }
  
  export async function POST(request: Request) {
    const { text } = await request.json();
  
    if (!text) {
      return NextResponse.json({ message: 'Text is required' }, { status: 400 });
    }
    try {
        const message = new Message({ text });
        await message.save();
        return NextResponse.json(message, { status: 201 });
      } catch (error) {
        return NextResponse.json({ message: 'Server error', error }, { status: 500 });
      }
  }