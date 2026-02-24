"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence , motion } from "framer-motion";
import {  Urbanist } from "next/font/google";
import PremiumButton from "./ui/Button";


const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-urbanist",
});

const Hero = () => {
  const images = [
    "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771873965/pexels-artempodrez-8986070_jmhtbv.jpg",
    "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771873593/pexels-cottonbro-4489749_caq7iq.jpg",
    "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771873951/pexels-olly-3807277_s1wcnw.jpg",
  ];

  const [current, setCurrent] = useState(0);

  // ✅ Auto Carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT SIDE */}
        <div className="space-y-10">

          <div className="space-y-6">
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight ${urbanist.className}`}>
             Auto Repair <br></br> &  Maintenance 
              <span className="block text-blue-600">
               Report Provider
              </span>
            </h1>

            <p className="text-lg text-gray-500 max-w-xl leading-relaxed">
Comprehensive vehicle history and diagnostics. Enter your VIN to get expert maintenance reports for your ride.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
<PremiumButton/>
          </div>

          {/* Small Clean Thumbnails */}
          <div className="flex gap-4 pt-4">
            {images.map((img, index) => (
              <div
                key={index}
                onClick={() => setCurrent(index)}
                className={`relative w-16 h-16 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                  current === index
                    ? "ring-2 ring-blue-600 scale-105"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt="preview"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT SIDE IMAGE */}
   <div className="relative w-full h-87.5 sm:h-112.5 lg:h-137.5 overflow-hidden rounded-lg">

<AnimatePresence mode="wait">
  <motion.div
    key={current}
    initial={{
      opacity: 0,
      y: 30,
      scale: 1.05,
    }}
    animate={{
      opacity: 1,
      y: 0,
      scale: 1,
    }}
    exit={{
      opacity: 0,
      y: -20,
      scale: 1.02,
    }}
    transition={{
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1], // smooth premium easing
    }}
    className="absolute inset-0 overflow-hidden rounded-2xl"
  >
    <Image
      src={images[current]}
      alt="Hero"
      fill
      priority
      className="object-cover"
    />

    {/* Very soft overlay for premium tone */}
    <div className="absolute inset-0 bg-black/5" />
  </motion.div>
</AnimatePresence>
</div>

      </div>
    </section>
  );
};

export default Hero;