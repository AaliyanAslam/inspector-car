"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Poppins, Urbanist } from "next/font/google";
import { useRouter } from "next/navigation";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-urbanist",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-poppins",
});

const services = [
  "Comprehensive Vehicle History Reports",
  "Diagnostic & Maintenance Insights",
  "VIN-Based Repair Recommendations",
  "Transparent & Reliable Service",
];

const images = [
  "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771873965/pexels-artempodrez-8986070_jmhtbv.jpg",
  "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771873593/pexels-cottonbro-4489749_caq7iq.jpg",
  "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771873951/pexels-olly-3807277_s1wcnw.jpg",
];

// Smooth Animation Constants (Matching your Stats Section)
const SMOOTH_CURVE = [0.215, 0.61, 0.355, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: SMOOTH_CURVE },
  },
};

const VehicleReports = () => {
  const router = useRouter();
  return (
    <section className="w-full bg-[#07101D] py-20 lg:py-28 px-4 sm:px-6 lg:px-12 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP HEADING SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: SMOOTH_CURVE }}
          className={`mb-6 lg:mb-16 max-w-5xl ${urbanist.className}`}
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
            Expert Vehicle Reports & Maintenance — 
            <span className="text-blue-500"> Anytime, Anywhere</span>
          </h2>
        </motion.div>

        {/* MAIN GRID */}
        <div className={`grid lg:grid-cols-2 gap-6 lg:gap-20 items-center ${poppins.className}`}>

          {/* LEFT SIDE - Images & Intro */}
          <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={{
               visible: { transition: { staggerChildren: 0.15 } }
             }}
             className="space-y-6 lg:space-y-8"
          >
            <motion.p variants={fadeUp} className="text-blue-400 text-sm sm:text-xl font-medium max-w-lg leading-relaxed">
              We realize that you lead a busy life, so we have made it easy for
              you to drop off your vehicle 24/7.
            </motion.p>

            {/* Images Layout */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="relative h-64 sm:h-80 lg:h-112.5 rounded-2xl overflow-hidden shadow-lg border border-white/10 group">
                <Image 
                  src={images[0]} 
                  alt="Inspection 1" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>

              <div className="grid gap-3 sm:gap-4">
                <div className="relative h-32 sm:h-38 lg:h-53.75 rounded-2xl overflow-hidden shadow-lg border border-white/10 group">
                  <Image 
                    src={images[1]} 
                    alt="Inspection 2" 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                </div>
                <div className="relative h-32 sm:h-38 lg:h-53.75 rounded-2xl overflow-hidden shadow-lg border border-white/10 group">
                  <Image 
                    src={images[2]} 
                    alt="Inspection 3" 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE - Content & Features */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
            }}
            className="space-y-10 lg:pl-6"
          >
            
            <motion.p variants={fadeUp} className="text-gray-400 text-sm sm:text-lg leading-relaxed font-light">
              We understand that your time is valuable, which is why{" "}
              <strong className="text-white font-semibold">Inspect a Report</strong>{" "}
              offers instant repair and maintenance reports for your vehicle. Enter your VIN number and get a detailed analysis of past repairs, diagnostics, and maintenance schedules — available 24/7.
            </motion.p>

            {/* Feature List */}
            <motion.div variants={fadeUp} className="space-y-6">
              <div className="relative pl-4 mb-2 lg:mb-6">
                <div className="absolute left-0 top-0 bottom-0 w-[2.5px] bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)]" />
                <h4 className={`${urbanist.className} text-blue-400 font-bold uppercase tracking-[0.25em] text-[10px] sm:text-[11px] leading-tight`}>
                  What We Offer
                </h4>
              </div>

              <ul className="grid gap-2 sm:gap-5">
                {services.map((service, idx) => (
                  <motion.li 
                    key={idx} 
                    variants={fadeUp}
                    className="flex items-start gap-2 text-gray-300"
                  >
                    <div className="mt-1 shrink-0">
                      <CheckCircle2 size={18} className="text-blue-500" />
                    </div>
                    <span className="text-sm sm:text-base font-medium">{service}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Action Button */}
            <motion.div variants={fadeUp} className="pt-1">
              <button
      onClick={() => router.push("/pricing")}
              
              className="cursor-pointer group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-blue-600 text-white px-9 py-4 rounded-sm font-bold text-xs sm:text-sm tracking-widest hover:bg-white hover:text-[#07101D] transition-all duration-300 active:scale-95 shadow-[0_10px_20px_rgba(37,99,235,0.2)]">
                EXPLORE MORE
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default VehicleReports;