import { NextResponse } from "next/server";

export async function POST(req) {
  const { amount } = await req.json();

  const auth = Buffer.from(
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID +
      ":" +
      process.env.PAYPAL_CLIENT_SECRET,
  ).toString("base64");

  const response = await fetch(
    `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: amount,
            },
          },
        ],
      }),
    },
  );

  const data = await response.json();
  return NextResponse.json(data);
}
