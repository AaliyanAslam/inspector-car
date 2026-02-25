"use client";

import React from "react";
import { motion } from "framer-motion";
import { Urbanist } from "next/font/google";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-urbanist",
});

const PageTitle = ({ tittle }) => {
  return (
<>
    <section 
      className={`relative w-full h-62.5 md:h-87.5 flex items-center justify-center overflow-hidden bg-slate-900 ${urbanist.className}`}
    >
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://res.cloudinary.com/dlyidp2yt/image/upload/v1771873965/pexels-artempodrez-8986070_jmhtbv.jpg')`, 
        }}
      />

      <div className="absolute inset-0 z-10 bg-slate-900/50 backdrop-blur-[1px]" />
      
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-slate-900/80" />
      
      <div className="absolute inset-0 z-10 bg-linear-to-b from-slate-900/40 via-transparent to-slate-900/20" />

      <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative z-20 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-1 bg-blue-500 mx-auto mb-6 rounded-full" 
          />
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-2xl">
            {tittle}
          </h1>

         
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 z-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-10 fill-white">
          <path d="M1200 120L0 120L0 0C161.3 23.5 350.4 41 600 41C849.6 41 1038.7 23.5 1200 0L1200 120Z"></path>
        </svg>
      </div>
    </section>
</>
  );
};

export default PageTitle;