"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Urbanist, Poppins } from "next/font/google";
import Image from "next/image";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-urbanist",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-poppins",
});

const testimonials = [
  {
    name: "Ethan W",
    handle: "@username",
    text: "Inspect a Report's report helped me uncover past accident records on a used bike I was about to buy. Their service saved me from a bad deal—highly recommended.",
    img: "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771957179/Team-2_smx3pi.webp"
  },
  {
    name: "Daniel K",
    handle: "@username",
    text: "Managing multiple trucks is tough, but Inspect a Report's reports keep my fleet in top shape. Their detailed maintenance insights help me prevent costly breakdowns!",
    img: "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771957194/Team-1_dabtxp.webp"
  },
  {
    name: "Olivia T",
    handle: "@username",
    text: "I wanted to check my car’s repair history before selling it, and Inspect a Report gave me a full breakdown in minutes. The buyer was impressed, and I got a better price!",
    img: "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771957186/Team-4_s8ay0p.webp"
  }
];

const CleanTestimonials = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={`w-full bg-[#FFFFFF] py-16 lg:py-32 px-6 sm:px-12 overflow-hidden ${urbanist.className}`}>
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        
        {/* LEFT SIDE: HEADER */}
        <div className="w-full lg:w-[40%] text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center lg:justify-start gap-3 mb-6"
          >
            <span className="text-blue-600 font-bold uppercase tracking-[0.25em] text-[11px]">
              Testimonials
            </span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1A1C1E] tracking-tight leading-[1.1] mb-6">
            Trusted by <br className="hidden lg:block" />
            <span className="text-blue-600">Smart Drivers</span>
          </h2>
          
          <p className={`${poppins.className} text-[#5F6368] text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-sm mx-auto lg:mx-0`}>
            See how our detailed history reports are changing the way people buy and sell vehicles.
          </p>
        </div>

        {/* RIGHT SIDE: PREMIUM GLASS CARD */}
        {/* Added dynamic height handling for mobile responsiveness */}
        <div className="w-full lg:w-[60%] relative flex items-center min-h-95 sm:min-h-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative lg:absolute lg:inset-0 backdrop-blur-xl bg-linear-to-br from-white via-white to-blue-50/40 
              p-8 sm:p-14 rounded-3xl border border-blue-100/40 
              shadow-[0_20px_60px_rgba(0,0,0,0.05)] flex flex-col justify-between overflow-hidden w-full"
            >
              {/* QUOTE ICON */}
              <div className="absolute -top-4 -left-2 sm:-top-10 sm:-left-6 text-[80px] sm:text-[160px] font-extrabold text-blue-600/5 select-none pointer-events-none">
                ”
              </div>

              {/* TESTIMONIAL TEXT */}
              <div className="relative z-10 pt-4">
                <p className={`${poppins.className} text-[#1A1C1E] 
                  text-base sm:text-xl lg:text-2xl leading-[1.6] sm:leading-[1.7] font-medium`}>
                  {testimonials[index].text}
                </p>
              </div>

              {/* USER SECTION */}
              <div className="flex items-center gap-4 sm:gap-5 mt-8 sm:mt-12 relative z-10">
                <div className="relative h-12 w-12 sm:h-16 sm:w-16 rounded-full overflow-hidden 
                ring-4 ring-blue-50 shadow-sm shrink-0">
                  <Image
                    src={testimonials[index].img}
                    alt={testimonials[index].name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h4 className="text-[#111] font-bold text-base sm:text-lg leading-tight">
                    {testimonials[index].name}
                  </h4>
                  <p className="text-blue-600 font-medium text-xs sm:text-sm tracking-wide mt-0.5">
                    {testimonials[index].handle}
                  </p>
                </div>
              </div>

              {/* PROGRESS BAR - Refined for "Clean" look */}
              <div className="absolute bottom-0 left-0 h-0.5 w-full bg-gray-50">
                <motion.div
                  key={index}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 6, ease: "linear" }}
                  className="h-full bg-blue-600"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
      
      {/* MOBILE DOTS (Optional but cleaner for UX) */}
      <div className="flex justify-center gap-2 mt-8 lg:hidden">
        {testimonials.map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 rounded-full transition-all duration-300 ${index === i ? "w-6 bg-blue-600" : "w-1.5 bg-gray-200"}`} 
          />
        ))}
      </div>
    </section>
  );
};

export default CleanTestimonials;