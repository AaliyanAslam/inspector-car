import { NextResponse } from "next/server";

export async function POST(req) {
  const { orderID } = await req.json();

  const auth = Buffer.from(
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID +
      ":" +
      process.env.PAYPAL_CLIENT_SECRET,
  ).toString("base64");

  const response = await fetch(
    `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
    },
  );

  const data = await response.json();
  return NextResponse.json(data);
}
