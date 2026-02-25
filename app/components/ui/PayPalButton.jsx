"use client";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function PaypalButton({ amount }) {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
      }}
    >
      <PayPalButtons
        createOrder={async () => {
          const res = await fetch("/api/paypal/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount }),
          });

          const data = await res.json();
          return data.id;
        }}
        onApprove={async (data) => {
          await fetch("/api/paypal/capture-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderID: data.orderID }),
          });

          alert("Payment Successful 🎉");
        }}
      />
    </PayPalScriptProvider>
  );
}