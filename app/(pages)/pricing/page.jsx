"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plus_Jakarta_Sans, Urbanist } from "next/font/google";
import { Rocket, Bell, ArrowLeft } from "lucide-react";
import Link from "next/link";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
});

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-urbanist",
});

const PricingComingSoon = () => {
  return (
    <div className={`min-h-[90vh] w-full flex items-center justify-center bg-[#fcfcfd] px-6 py-12 ${jakarta.className}`}>
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-orange-50 rounded-full blur-[120px] opacity-60" />
      </div>

      <div className="relative z-10 max-w-3xl w-full text-center">
        
  
    

        {/* Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`${urbanist.className} text-4xl sm:text-6xl font-extrabold text-[#1a2b3c] mb-6 tracking-tight leading-tight`}
        >
          Premium Pricing <br />
          <span className="text-blue-600">Coming Soon</span>
        </motion.h1>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-slate-500 text-lg sm:text-xl max-w-xl mx-auto mb-12 font-light leading-relaxed"
        >
          We are finalizing our flexible plans to give you the best value for detailed vehicle history and maintenance reports.
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 group">
            <Bell className="w-5 h-5 group-hover:animate-bounce" />
            Notify Me When Ready
          </button>
          
          <Link 
            href="/" 
            className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </motion.div>

        {/* Progress Bar Placeholder */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.6, duration: 1.5 }}
          className="max-w-md mx-auto mt-16 h-1.5 bg-slate-100 rounded-full overflow-hidden"
        >
          <div className="h-full bg-blue-600 w-[75%] rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)]" />
        </motion.div>
        <p className="mt-4 text-slate-400 text-xs font-semibold uppercase tracking-widest">
          Development Progress: 75%
        </p>
      </div>
    </div>
  );
};

export default PricingComingSoon;