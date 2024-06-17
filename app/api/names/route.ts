import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Name from "@/models/Name";

export async function GET() {
   await connectDB();
  const names = await Name.find().sort({rating: -1});
  return NextResponse.json(names);
}

export async function POST(req: Request) {
  await connectDB();
  const {id, rating } = await req.json();
  const name = await Name.findById(id);
  if (!name) {
    return NextResponse.json({ error: "Name not found" }, {status: 404});
  }
  name.rating += rating;
  await name.save();
  return NextResponse.json(name);
}