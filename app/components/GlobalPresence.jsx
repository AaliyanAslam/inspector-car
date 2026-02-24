"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Urbanist, Poppins } from "next/font/google";
import { Flag } from "lucide-react";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-urbanist",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-poppins",
});

// Replace these with your actual flag image URLs or paths
const flags = [
  "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771956459/Flag_of_Australia_Flat_Wavy-512x295-1_ksizcq.webp",
  "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771956474/Flag_of_France_Flat_Wavy-512x393-1_lz4vwh.webp",
  "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771956466/Flag_of_New_Zealand_Flat_Wavy-512x295-1_zepgcp.webp",
  "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771956483/Flag_of_Romania_Flat_Wavy-512x393-1_fjbhby.webp",
  "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771956490/Flag_of_Germany_Flat_Wavy-512x353-1_rydvsx.webp",
  "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771956502/Flag_of_France_Flat_Wavy-512x393-1-1_zi3ndu.webp",
  "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771956509/Flag_of_Austria_Flat_Wavy-512x393-1_sugsad.webp",
  "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771956517/Flag_of_Canada_Flat_Wavy-512x295-1_bcxjta.webp",
  "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771956525/Flag_of_United_States_Flat_Wavy-512x310-1_pppqge.webp",
  "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771956528/Flag_of_Spain_Flat_Wavy-512x393-1_jvnnkt.webp",
];

// We double the array to ensure a seamless infinite loop
const infiniteFlags = [...flags, ...flags];

const GlobalPresence = () => {
  return (
    <section className="w-full bg-white py-20 lg:py-28 px-4 sm:px-6 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP SECTION */}
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            className="space-y-4"
          >
         <div className="flex flex-col items-center text-center">
  {/* The Line */}
<Flag size={24} className="text-blue-600 mb-2" fill="blue"/>  
  {/* The Text */}
  <h4 className={`${urbanist.className} text-blue-600 font-bold uppercase tracking-[0.3em] text-[10px] sm:text-[11px]`}>
    Anywhere You Need
  </h4>
</div>

            <h2 className={`${urbanist.className} text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight`}>
              Where We Provide <span className="text-blue-600">Service</span>
            </h2>

            <p className={`${poppins.className} text-gray-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed`}>
              Serving Customers Across the Globe. We proudly offer our services in the following countries, 
              ensuring transparency and reliability no matter where you are.
            </p>
          </motion.div>
        </div>

        {/* INFINITE CAROUSEL */}
        <div className="relative mt-10">
          {/* Left & Right Gradient Fades for a Premium Look */}
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-l from-white to-transparent z-10" />

          <div className="flex overflow-hidden group">
            <motion.div 
              className="flex gap-8 sm:gap-16 items-center whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ 
                duration: 25, 
                ease: "linear", 
                repeat: Infinity 
              }}
            >
              {infiniteFlags.map((flag, index) => (
                <div 
                  key={index} 
                  className="relative w-16 h-10 sm:w-24 sm:h-16 shrink-0  transition-all duration-500 opacity-90 hover:opacity-100 scale-90 hover:scale-100"
                >
                  <Image
                    src={flag}
                    alt="Country Flag"
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default GlobalPresence;