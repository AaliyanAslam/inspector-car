"use client";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function PaypalButton({ amount, onSuccess }) {
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
                // 🔥 Ye line aapke Checkout Page ke function ko call karegi
                // Saath mein PayPal ka capture data bhi bhej rahi hai
                onSuccess(captureData);
              } else {
                alert("Payment was not completed successfully.");
              }
            } catch (err) {
              console.error("PayPal Capture Error:", err);
              alert("An error occurred during payment capture.");
            }
          }}
          onError={(err) => {
            console.error("PayPal Global Error:", err);
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
}