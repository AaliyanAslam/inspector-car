"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Urbanist, Poppins } from "next/font/google";
import { XCircle, RefreshCcw, MessageCircle, AlertCircle, ArrowLeft } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const urbanist = Urbanist({ subsets: ["latin"], weight: ["700", "800"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function FailedPage() {
  const router = useRouter();

  return (
    <div className={`bg-[#F8F9FA] min-h-screen ${poppins.className} text-slate-900 flex flex-col`}>
      <Navbar />
      
      <main className="grow flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full">
          {/* Main Card */}
          <div className="bg-white rounded p-10 md:p-12 shadow-xl shadow-red-100/30 border border-red-50 text-center relative overflow-hidden">
            
            {/* Top Pattern Decoration */}
            <div className="absolute top-0 left-0 w-full h-2 bg-red-500/10" />

            {/* Error Icon */}
            <div className="inline-flex items-center justify-center w-14 h-14 bg-red-50 rounded-full mb-8 ">
              <XCircle className="text-red-500" size={32} strokeWidth={2.5} />
            </div>
            
            <h1 className={`${urbanist.className} text-3xl font-extrabold text-slate-900 tracking-tight`}>
              Payment Failed
            </h1>
            
            <p className="text-slate-500 mt-4 font-medium text-sm leading-relaxed">
              We couldn't process your transaction. This usually happens due to a temporary bank issue, incorrect card details, or a cancelled session.
            </p>

            {/* Status Badge */}
            <div className="mt-6 flex items-center justify-center gap-2 py-2.5 px-4 bg-amber-50 rounded text-amber-700 text-[10px] font-bold uppercase tracking-widest border border-amber-100/50">
              <AlertCircle size={14} />
              No charges were made to your account
            </div>

            {/* Action Buttons */}
            <div className="mt-10 space-y-3">
              <button 
                onClick={() => router.push("/checkout")}
                className="w-full flex items-center justify-center gap-3 py-4 bg-slate-900 text-white rounded font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-95"
              >
                <RefreshCcw size={18} /> Try Payment Again
              </button>
              
              <button 
                onClick={() => router.push("/")}
                className="w-full flex items-center justify-center gap-3 py-4 bg-white border border-slate-200 text-slate-700 rounded font-bold hover:bg-slate-50 transition-all active:scale-95"
              >
                <ArrowLeft size={18} /> Back to Homepage
              </button>
            </div>

          
          </div>
          
          {/* Security Note */}
          <p className="mt-8 text-center text-slate-400 text-[11px] font-medium leading-loose">
            Your data is encrypted and secure. <br />
            Transaction attempt logged for security purposes.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}