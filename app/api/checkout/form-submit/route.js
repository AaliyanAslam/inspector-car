import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();

    // 🛑 YAHAN APNA LOGIC LIKHO:
    // 1. Database (MongoDB/PostgreSQL) mein save karo
    // 2. Client ko success email bhejo

    console.log("FINAL ORDER RECEIVED:", data);

    return NextResponse.json({ success: true, message: "Order saved" });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
