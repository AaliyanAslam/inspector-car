"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Poppins, Urbanist } from "next/font/google";
import PremiumButton from "./ui/Button";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-urbanist",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-poppins",
});

const Hero = () => {
  const images = [
    "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771873965/pexels-artempodrez-8986070_jmhtbv.jpg",
    "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771873593/pexels-cottonbro-4489749_caq7iq.jpg",
    "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771873951/pexels-olly-3807277_s1wcnw.jpg",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4500); // smoother timing

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="max-w-360 mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 3xl:px-28
                      py-6 sm:py-8 md:py-24 lg:py-12 xl:py-18">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-2 lg:space-y-6">

            {/* Heading */}
            <div className="space-y-2 lg:space-y-6">
              <h1
                className={`
                ${urbanist.className}
                font-extrabold
                text-2xl sm:text-4xl lg:text-5xl
                leading-[1.1]
                text-gray-900
              `}
              >
                Auto Repair & Maintenance
                <span className="block  text-blue-600">
                  Report Provider
                </span>
              </h1>

              <p className={`text-gray-500 
                             text-xs 
                             sm:text-lg 
                             md:text-xl 
                             leading-relaxed 
                             max-w-xl ${poppins.className}`}>
                Comprehensive vehicle history and diagnostics. Enter your VIN
                to get expert maintenance reports for your ride.
              </p>
            </div>

            {/* Button */}
            <div className="flex flex-wrap gap-4">
              <PremiumButton />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 sm:gap-4 pt-4 flex-wrap">
              {images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`relative 
                    w-14 h-14 
                    sm:w-16 sm:h-16 
                    md:w-18 md:h-18 
                    rounded-xl overflow-hidden cursor-pointer 
                    transition-all duration-300
                    ${
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

          {/* RIGHT IMAGE */}
          <div className="relative w-full
                          h-80
                          sm:h-105
                          md:h-125
                          lg:h-125
                          xl:h-137.5
                          2xl:h-150
                          rounded-3xl overflow-hidden">

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{
                  opacity: 0,
                  y: 40,
                  scale: 1.05,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -30,
                  scale: 1.02,
                }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0"
              >
                <Image
                  src={images[current]}
                  alt="Hero"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw,
                         (max-width: 1200px) 50vw,
                         50vw"
                  className="object-cover"
                />

                {/* Premium Soft Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;