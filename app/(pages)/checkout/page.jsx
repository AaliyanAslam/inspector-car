"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Urbanist, Poppins } from "next/font/google";
import { Country, State } from "country-state-city";
import { ShieldCheck, ChevronDown, Lock, Info } from "lucide-react";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import PaypalButton from "@/app/components/ui/PayPalButton";

const urbanist = Urbanist({ subsets: ["latin"], weight: ["700", "800"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

const services = ["Car", "Bike", "Truck", "Yacht", "Jet Ski", "Boat", "Van", "Caravan", "ATV", "RV"];

const CheckoutContent = () => {
  const searchParams = useSearchParams();
  const planName = searchParams.get("plan") || "Basic Plan";
  const planPrice = searchParams.get("price") || "59.99";

  const [agreed, setAgreed] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    service: "Car",
    country: "",
    state: "",
    city: "",
    phone: "",
    email: "",
    vin: ""
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
      planName,
      planPrice,
      paymentId: paymentResult.id,
      paymentStatus: "COMPLETED",
      orderDate: new Date().toISOString()
    };

    try {
      const response = await fetch("/api/checkout/form-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      if (response.ok) {
        alert("Payment successful and order saved! Check your email for details.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Payment done but data save failed. Please contact support.");
    }
  };

  return (
    <div className={`bg-[#FFFFFF] min-h-screen text-black ${poppins.className}`}>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-6 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          
          {/* LEFT: FORM */}
          <div className="w-full lg:flex-1 order-2 lg:order-1">
            <header className="mb-6 text-center lg:text-left">
              <h1 className={`${urbanist.className} text-2xl md:text-3xl font-extrabold text-black`}>Checkout</h1>
              <p className="text-gray-500 text-xs mt-1">Fill in your details to get your report.</p>
            </header>

            <div className="bg-white rounded p-4 md:p-8 border border-gray-200 shadow-sm">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="John" />
                  <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Doe" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CustomSelect label="Service" name="service" value={formData.service} onChange={handleInputChange} options={services} />
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-1">Country</label>
                    <div className="relative">
                      <select name="country" value={formData.country} onChange={handleInputChange} className="w-full bg-white border border-gray-300 rounded p-2.5 text-xs font-medium appearance-none outline-none focus:ring-1 focus:ring-blue-500">
                        <option value="">Select Country</option>
                        {allCountries.map((c) => <option key={c.isoCode} value={c.isoCode}>{c.name}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="City" name="city" value={formData.city} onChange={handleInputChange} placeholder="New York" />
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-1">State</label>
                    <div className="relative">
                      <select disabled={!formData.country} name="state" value={formData.state} onChange={handleInputChange} className="w-full bg-white border border-gray-300 rounded p-2.5 text-xs font-medium appearance-none outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50">
                        <option value="">Select State</option>
                        {availableStates.map((s) => <option key={s.isoCode} value={s.isoCode}>{s.name}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+1..." />
                  <Input label="Email" name="email" value={formData.email} onChange={handleInputChange} placeholder="email@example.com" />
                </div>

                <Input label="VIN Number" name="vin" value={formData.vin} onChange={handleInputChange} placeholder="17-digit VIN" />

                <div className="bg-gray-50 rounded p-4 border border-gray-200 mt-4">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-xs font-medium text-gray-700 leading-tight">I agree to the Terms & Conditions and acknowledge that reports are non-refundable.</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <aside className="w-full lg:w-90 order-1 lg:order-2">
  <div className="lg:sticky lg:top-24">
    {/* Clean White Theme Container */}
    <div className="bg-white rounded p-6 text-black border border-gray-200 shadow-sm relative overflow-hidden">
      
      {/* Header with Urbanist Font */}
      <h3 className={`${urbanist.className} text-xl font-extrabold mb-6 flex justify-between items-center text-black tracking-tight`}>
        Order Summary <Lock size={14} className="text-gray-400" />
      </h3>
      
      {/* Details Section */}
      <div className="space-y-4 mb-6 border-b border-gray-100 pb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 font-medium">{planName}</span>
          <span className="text-sm font-bold text-black">${planPrice}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Tax & Fees</span>
          <span className="text-[10px] text-gray-400 font-bold">$0.00</span>
        </div>
      </div>

      {/* Total Section */}
      <div className="flex justify-between items-baseline mb-8">
        <span className="text-xs font-bold text-gray-500 uppercase">Total Due</span>
        <span className={`${urbanist.className} text-3xl font-extrabold text-blue-600`}>
          ${planPrice}
        </span>
      </div>

      {/* Payment Button Area - Fixed for Mobile Click */}
      <div className="relative min-h-12.5 flex flex-col items-center justify-center">
        {agreed ? (
          <div className="w-full relative z-50">
            <PaypalButton amount={planPrice} onSuccess={handlePaymentSuccess} />
          </div>
        ) : (
          <div className="w-full py-4 px-4 bg-gray-50 rounded border border-dashed border-gray-200 text-center space-y-2">
            <Info size={16} className="mx-auto text-gray-300" />
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">
              Please fill all fiels and accept terms to enable payment
            </p>
          </div>
        )}
      </div>

      {/* Trust Badge */}
      <div className="mt-6 flex items-center justify-center gap-2 text-gray-400">
        <ShieldCheck size={12} />
        <span className="text-[10px] font-bold uppercase tracking-tighter">Secure 256-bit SSL Payment</span>
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

// COMPACT UI COMPONENTS
const Input = ({ label, ...props }) => (
  <div className="space-y-1 w-full">
    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-1">{label}</label>
    <input {...props} className="w-full bg-white border border-gray-300 rounded p-2.5 text-xs font-medium focus:ring-1 focus:ring-blue-500 transition-all outline-none text-black placeholder:text-gray-300" />
  </div>
);

const CustomSelect = ({ label, options, ...props }) => (
  <div className="space-y-1 w-full">
    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-1">{label}</label>
    <div className="relative">
      <select {...props} className="w-full bg-white border border-gray-300 rounded p-2.5 text-xs font-medium appearance-none outline-none cursor-pointer text-black">
        {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
    </div>
  </div>
);

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center bg-white text-black text-sm">Loading Checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}