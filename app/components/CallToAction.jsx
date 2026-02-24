"use client";

import React from "react";
import { motion } from "framer-motion";
import { Urbanist, Poppins } from "next/font/google";
import Link from "next/link";

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
      className={`relative w-full min-h-125 flex items-center justify-center overflow-hidden ${urbanist.className}`}
    >
      {/* FIXED BACKGROUND IMAGE */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
        style={{ 
          backgroundImage: `url('https://res.cloudinary.com/dlyidp2yt/image/upload/v1771958973/shop-man-s-hand-glove-holds-wrench-front-broken-automobile_1_nlfctj.jpg')`, // Professional car image
        }}
      />

      {/* GRADIENT OVERLAY (Google Clean style: subtle and dark for readability) */}
      <div className="absolute inset-0 z-10 bg-linear-to-r from-black/80 via-black/50 to-transparent lg:from-black/70" />

      {/* CONTENT CONTAINER */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-12 w-full">
        <div className="max-w-2xl text-center lg:text-left">
          
          {/* TOP TAGLINE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center lg:justify-start gap-3 mb-6"
          >
            <span className="h-0.5 w-8 bg-blue-500 rounded-full" />
            <span className="text-blue-400 font-bold uppercase tracking-[0.3em] text-[10px] sm:text-xs">
              We provide trusted services for you
            </span>
          </motion.div>

          {/* MAIN HEADING */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6"
          >
            Imagine Your Car <br />
            <span className="text-blue-500">Like New Again</span>
          </motion.h2>

          {/* DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`${poppins.className} text-gray-300 text-base sm:text-lg lg:text-xl font-light leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0`}
          >
            Get detailed repair insights and maintenance reports to keep your car running like new.
          </motion.p>

          {/* BUTTON */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all duration-300 shadow-lg shadow-blue-600/30 group"
            >
              Contact Us
              <svg 
                className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CallToAction;