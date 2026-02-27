"use client";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";

export default function PaypalButton({ amount, onSuccess }) {
  const router = useRouter();
  return (
    <PayPalScriptProvider
      options={{
        "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        components: "buttons",
        "disable-funding": "paylater,credit", // Card and PayPal only
        currency: "USD",
      }}
    >
    <div className="w-full">
  <PayPalButtons
    style={{
      color: "gold",
      shape: "rect",
      label: "pay",
      height: 45,
    }}
    createOrder={async () => {
      try {
        const res = await fetch("/api/paypal/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        });

        if (!res.ok) throw new Error("Order creation failed");

        const data = await res.json();
        return data.id;
      } catch (err) {
        console.error("PayPal Create Order Error:", err);
        // Agar order create hi nahi hua toh seedha failed page
        router.push("/checkout/failed");
      }
    }}
    onApprove={async (data) => {
      try {
        const res = await fetch("/api/paypal/capture-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderID: data.orderID }),
        });

        const captureData = await res.json();

        if (captureData.status === "COMPLETED") {
          onSuccess(captureData);
        } else {
          // Payment complete nahi hui
          router.push("/checkout/failed");
        }
      } catch (err) {
        console.error("PayPal Capture Error:", err);
        router.push("/checkout/failed");
      }
    }}
    // 1. User closes the PayPal popup without paying
    onCancel={(data) => {
      console.log("Payment cancelled by user:", data);
      router.push("/checkout/failed");
    }}
    // 2. Technical error or card decline
    onError={(err) => {
      console.error("PayPal Global Error:", err);
      router.push("/checkout/failed");
    }}
  />
</div>
    </PayPalScriptProvider>
  );
}