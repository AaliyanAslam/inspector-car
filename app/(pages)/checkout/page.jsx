"use client";

import React, { useState, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Urbanist, Poppins } from "next/font/google";
import { Country, State } from "country-state-city";
import { ShieldCheck, ChevronDown, Lock, Info } from "lucide-react";
import { db } from "@/lib/firebase"; // File path check kar lein
import { collection, addDoc , serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import PaypalButton from "@/app/components/ui/PayPalButton";

const urbanist = Urbanist({ subsets: ["latin"], weight: ["700", "800"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

// Sahi price security ke liye array yahan bhi rakhein
const pricingPlans = [
  { id: "basic", name: "Basic Plan", price: "59.99" },
  { id: "standard", name: "Standard Plan", price: "74.99" },
  { id: "premium", name: "Premium Plan", price: "99.99" },
];

const services = ["Car", "Bike", "Truck", "Yacht", "Jet Ski", "Boat", "Van", "Caravan", "ATV", "RV"];

const CheckoutContent = () => {
  const searchParams = useSearchParams();
  const planId = searchParams.get("plan");
  const router = useRouter();

  // Get current plan data from ID
  const currentPlan = useMemo(() => {
    return pricingPlans.find((p) => p.id === planId) || pricingPlans[0];
  }, [planId]);

  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", service: "Car",
    country: "", state: "", city: "", phone: "", email: "", vin: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const allCountries = Country.getAllCountries();
  const availableStates = formData.country ? State.getStatesOfCountry(formData.country) : [];

const handlePaymentSuccess = async (paymentResult) => {
  const finalData = {
    ...formData,
    planName: currentPlan.name,
    planPrice: currentPlan.price,
    paymentId: paymentResult.id,
    paymentStatus: "COMPLETED",
    orderDate: new Date().toISOString(),
    // Best Practice: Use serverTimestamp for accurate sorting
    orderTimestamp: serverTimestamp(), 
  };

  try {
    // 1. Save to Firebase Firestore
    const docRef = await addDoc(collection(db, "orders"), finalData);
    console.log("Document written with ID: ", docRef.id);

    // 2. Prepare URL Params for Success Page
    const params = new URLSearchParams({
      id: docRef.id,
      firstName: formData.firstName || "",
      lastName: formData.lastName || "",
      email: formData.email || "",
      plan: currentPlan.name,
      price: currentPlan.price,
      vin: formData.vin || "",
      paymentId: paymentResult.id
    });

    // 3. Send Email/API Call
    try {
      await fetch("/api/checkout/form-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...finalData, firebaseId: docRef.id }),
      });
    } catch (apiErr) {
      console.error("Email API failed, but order is saved:", apiErr);
      // We don't stop the user here because payment is already done
    }

    // 4. Redirect to Success Page
    // Alert ki ab zaroorat nahi hai, page transition hi kafi hai
    router.push(`/checkout/success?${params.toString()}`);

  } catch (error) {
    console.error("Firebase Error:", error);
    // Agar payment ho gayi par firebase fail hua, toh user ko batana zaroori hai
    alert("Payment confirmed! But we had trouble saving your details. Please save your Transaction ID: " + paymentResult.id);
  }
};

  return (
    <div className={`bg-[#FFFFFF] min-h-screen text-black ${poppins.className}`}>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-6 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          
          {/* LEFT: FORM (Compact UI) */}
          <div className="w-full lg:flex-1 order-2 lg:order-1">
            <header className="mb-6">
              <h1 className={`${urbanist.className} text-2xl md:text-3xl font-extrabold`}>Checkout</h1>
              <p className="text-gray-400 text-xs mt-1 italic tracking-tight">Required fields marked with *</p>
            </header>

            <div className="bg-white rounded-lg p-5 md:p-8 border border-gray-200 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="First Name *" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="John" />
                <Input label="Last Name *" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Doe" />
                <CustomSelect label="Service" name="service" value={formData.service} onChange={handleInputChange} options={services} />
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-1">Country *</label>
                  <div className="relative">
                    <select name="country" value={formData.country} onChange={handleInputChange} className="w-full bg-white border border-gray-300 rounded p-2.5 text-xs font-medium appearance-none outline-none focus:ring-1 focus:ring-blue-500">
                      <option value="">Select Country</option>
                      {allCountries.map((c) => <option key={c.isoCode} value={c.isoCode}>{c.name}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-1">State *</label>
                  <div className="relative">
                    <select disabled={!formData.country} name="state" value={formData.state} onChange={handleInputChange} className="w-full bg-white border border-gray-300 rounded p-2.5 text-xs font-medium appearance-none outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50">
                      <option value="">Select State</option>
                      {availableStates.map((s) => <option key={s.isoCode} value={s.isoCode}>{s.name}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                  </div>
                </div>
                <Input label="City *" name="city" value={formData.city} onChange={handleInputChange} placeholder="City Name" />
                <Input label="Phone *" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+1..." />
                <Input label="Email *" name="email" value={formData.email} onChange={handleInputChange} placeholder="email@example.com" />
              </div>
              <div className="mt-4">
                <Input label="VIN/Registration Number *" name="vin" value={formData.vin} onChange={handleInputChange} placeholder="17-digit VIN" />
              </div>

              <div className="bg-gray-50 rounded p-4 border border-gray-200 mt-6">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-xs font-medium text-gray-600 leading-tight">I agree to the Terms & Conditions and understand reports are non-refundable.</span>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT: ORDER SUMMARY (Compact White) */}
          <aside className="w-full lg:w-80 order-1 lg:order-2">
            <div className="lg:sticky lg:top-24">
              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm relative overflow-hidden">
                <h3 className={`${urbanist.className} text-xl font-extrabold mb-6 flex justify-between items-center tracking-tight`}>
                  Summary <Lock size={14} className="text-gray-300" />
                </h3>
                
                <div className="space-y-4 mb-6 border-b border-gray-100 pb-6">
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-gray-500">{currentPlan.name}</span>
                    <span className="text-black">${currentPlan.price}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    <span>Tax & Fees</span>
                    <span>$0.00</span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline mb-8">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Total Due</span>
                  <span className={`${urbanist.className} text-3xl font-extrabold text-blue-600`}>${currentPlan.price}</span>
                </div>

                <div className="relative min-h-12.5 flex flex-col items-center justify-center">
                  {agreed ? (
                    <div className="w-full relative z-50">
                      <PaypalButton amount={currentPlan.price} onSuccess={handlePaymentSuccess} />
                    </div>
                  ) : (
                    <div className="w-full py-4 px-3 bg-gray-50 rounded border border-dashed border-gray-200 text-center">
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tight flex items-center justify-center gap-1">
                        <Info size={12}/>Fill the form and accept terms to enable pay
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex items-center justify-center gap-2 text-gray-600 border-t border-gray-50 pt-4">
                  <ShieldCheck size={12} />
                  <span className="text-[10px] font-bold uppercase tracking-tighter">Secure SSL Payment</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const Input = ({ label, ...props }) => (
  <div className="space-y-1 w-full">
    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-1">{label}</label>
    <input {...props}  className="w-full bg-white border border-gray-300 rounded p-2.5 text-xs font-medium focus:ring-1 focus:ring-blue-500 transition-all outline-none text-black placeholder:text-gray-200" />
  </div>
);

const CustomSelect = ({ label, options, ...props }) => (
  <div className="space-y-1 w-full">
    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-1">{label}</label>
    <div className="relative">
      <select {...props} className="w-full bg-white border border-gray-300 rounded p-2.5 text-xs font-medium appearance-none outline-none text-black">
        {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
    </div>
  </div>
);

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center bg-white text-xs font-bold uppercase tracking-widest">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}