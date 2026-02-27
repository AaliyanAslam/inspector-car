"use client";

import React from "react";
import { motion } from "framer-motion";
import { Urbanist, Poppins } from "next/font/google";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-urbanist",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-poppins",
});

const CallToAction = () => {
  return (
    <section 
      className={`relative w-full min-h-125 flex items-center justify-center overflow-hidden py-24 ${urbanist.className}`}
    >
      {/* FIXED BACKGROUND IMAGE WITH MOBILE FIX */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-scroll lg:bg-fixed"
        style={{ 
          backgroundImage: `url('https://res.cloudinary.com/dlyidp2yt/image/upload/v1771958973/shop-man-s-hand-glove-holds-wrench-front-broken-automobile_1_nlfctj.jpg')`,
        }}
      />

      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 z-10 bg-black/65 backdrop-blur-[1px]" />

      {/* CONTENT CONTAINER */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
        
        {/* TOP TAGLINE */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 mb-6"
        >
          <div className="h-px w-6 bg-blue-500/50" />
          <span className="text-blue-400 font-bold uppercase tracking-[0.3em] text-[10px] sm:text-xs">
            We provide trusted services for you
          </span>
          <div className="h-px w-6 bg-blue-500/50" />
        </motion.div>

        {/* MAIN HEADING */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.1] mb-8 tracking-tight"
        >
          Imagine Your Car <br />
          <span className="text-blue-500">Like New Again</span>
        </motion.h2>

        {/* DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`${poppins.className} text-gray-300 text-base sm:text-lg lg:text-xl font-light leading-relaxed mb-12 max-w-2xl mx-auto`}
        >
          Get detailed repair insights and maintenance reports to keep your car running like new. Stay ahead of repairs with precision data.
        </motion.p>

        {/* CLEAN BUTTON */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center"
        >
          <Link 
            href="#"
            className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-300 bg-blue-600  hover:bg-white hover:text-black hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(37,99,235,0.3)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Contact Us
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default CallToAction;