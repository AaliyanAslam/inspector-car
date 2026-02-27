"use client";

import React, { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Urbanist, Poppins } from "next/font/google";
import { CheckCircle2, ArrowRight, Printer, Mail, ShieldCheck, User, CreditCard } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const urbanist = Urbanist({ subsets: ["latin"], weight: ["700", "800"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

const SuccessContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Redirect if accessed directly without payment data
  const paymentId = searchParams.get("paymentId");
  
  useEffect(() => {
    if (!paymentId) {
      router.replace("/");
    }
  }, [paymentId, router]);

  if (!paymentId) return null;

  const data = {
    id: searchParams.get("id") || "N/A",
    name: `${searchParams.get("firstName") || ""} ${searchParams.get("lastName") || ""}`,
    email: searchParams.get("email") || "N/A",
    plan: searchParams.get("plan") || "Plan",
    price: searchParams.get("price") || "0.00",
    vin: searchParams.get("vin") || "N/A",
    paymentId: paymentId,
  };

  return (
    <div className={`bg-[#F8F9FA] min-h-screen ${poppins.className} text-slate-900`}>
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-12 md:py-20">
        <div className="bg-white rounded shadow-xl shadow-slate-200/50 border border-gray-100 overflow-hidden">
          
          {/* Header */}
       <div className="bg-white px-8 py-16 text-center border-b border-gray-100">
  <div className="relative z-10 flex flex-col items-center">
    
    {/* Simple Google-style Checkmark */}
    <div className="mb-6 flex items-center justify-center w-16 h-16 bg-[#ebffdf] rounded-full">
      <CheckCircle2 className="text-[#48A111]" size={32} strokeWidth={2.5} />
    </div>

    {/* Typography - Pure Google Style */}
    <h1 className="text-[26px] font-medium text-[#202124] tracking-tight">
      Thank you for your order
    </h1>
    
    <p className="mt-3 text-[#5f6368] text-base leading-relaxed max-w-sm">
      Your vehicle report is being generated. We've sent a confirmation to your email.
    </p>

    {/* Contact Badge - Minimalist */}
    <div className="mt-6 flex items-center gap-2 px-3 py-1 bg-[#f8f9fa] border border-gray-200 rounded-md">
      <div className="w-1.5 h-1.5 rounded-full bg-[#188038]"></div>
      <span className="text-[12px] font-medium text-[#3c4043]">
        We'll contact you soon
      </span>
    </div>

  </div>
</div>

         <div className="p-6 md:p-10 bg-white rounded-2xl border border-gray-100">
  {/* Receipt Header */}
  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
    <div>
      <h2 className="text-xl font-semibold text-gray-900 tracking-tight">Transaction Details</h2>
      <p className="text-sm text-gray-500 mt-1">Receipt for your recent purchase</p>
    </div>
    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-xs font-medium text-gray-600 self-start">
      ID: {data.id.slice(0, 8)}
    </span>
  </div>

  {/* Grid Info */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 pb-8">
    <DetailBlock label="Customer" value={data.name} icon={<User size={18} className="text-gray-400"/>} />
    <DetailBlock label="Email Address" value={data.email} icon={<Mail size={18} className="text-gray-400"/>} />
    <DetailBlock label="Vehicle VIN" value={data.vin} icon={<ShieldCheck size={18} className="text-gray-400"/>} />
    <DetailBlock label="Plan Details" value={data.plan} icon={<CreditCard size={18} className="text-gray-400"/>} />
  </div>

  {/* Price Calculation */}
  <div className="pt-6 border-t border-gray-100 bg-gray-50/50 -mx-6 md:-mx-10 px-6 md:px-10 py-6">
    <div className="flex justify-between items-center mb-4">
      <span className="text-sm text-gray-500">PayPal Transaction ID</span>
      <span className="text-sm font-mono text-gray-700">{data.paymentId}</span>
    </div>
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium text-gray-900">Total Amount Paid</span>
      <span className="text-2xl font-semibold text-gray-900">
        ${data.price}
      </span>
    </div>
  </div>

  {/* Action Buttons */}
  <div className="mt-8 flex flex-col md:flex-row gap-3">
    <button 
      onClick={() => router.push("/")}
      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors shadow-sm"
    >
      Back to Home
    </button>
  
  </div>
</div>
        </div>
        
        <div className="mt-10 flex flex-col items-center gap-2 text-slate-400">
           <p className="text-xs font-medium italic opacity-75">Securely processed by PayPal Services</p>
           <ShieldCheck size={20} className="opacity-20" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

const DetailBlock = ({ label, value, icon }) => (
  <div className="space-y-1.5 group">
    <div className="flex items-center gap-2">
       {icon}
       <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
    </div>
    <p className="text-[15px] font-bold text-slate-800 break-words leading-tight">{value}</p>
  </div>
);

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center text-slate-400 font-bold tracking-widest uppercase text-xs animate-pulse">Verifying...</div>}>
      <SuccessContent />
    </Suspense>
  );
}