"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Poppins, Urbanist } from "next/font/google";

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

const stats = [
  { value: "15+", label: "Verified Customers Daily", desc: "Thousands of vehicle owners trust Inspect a Report." },
  { value: "100+", label: "Reports Generated Weekly", desc: "Comprehensive reports covering past repairs and service." },
  { value: "20+", label: "Expert Inspections", desc: "Our professional team analyzes vehicles with precision." },
  { value: "12+", label: "Years of Experience", desc: "Over a decade of expertise ensuring transparency." },
];

const SMOOTH_CURVE = [0.215, 0.61, 0.355, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: SMOOTH_CURVE },
  },
};

const StatsSection = () => {
  return (
    // PY-20 for mobile, PY-28 for desktop
    <section className="w-full bg-[#07101D] py-20 lg:py-28 px-4 sm:px-6 lg:px-12 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Gap adjusted for smaller screens */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* STATS GRID - 1 col on mobile, 2 on sm+ */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 order-2 lg:order-1"
          >
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                className="p-6 sm:p-8 rounded-xl bg-[#222F41] border border-white/5 hover:border-blue-500/20 hover:bg-white/3 transition-all duration-700 ease-[cubic-bezier(0.215,0.61,0.355,1)] group"
              >
                <h3 className={`${urbanist.className} text-3xl sm:text-4xl font-bold text-white mb-2 group-hover:text-blue-500 transition-colors duration-500`}>
                  {stat.value}
                </h3>
                <p className={`${urbanist.className} text-blue-500 font-semibold text-[10px] sm:text-xs uppercase tracking-[0.15em] mb-3`}>
                  {stat.label}
                </p>
                <p className={`${poppins.className} text-gray-300 text-xs sm:text-sm leading-relaxed font-light`}>
                  {stat.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* CONTENT SECTION */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: SMOOTH_CURVE }}
            className="space-y-6 sm:space-y-8 order-1 lg:order-2 lg:pl-6 text-left"
          >
            <div className="relative pl-4">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
              <h4 className={`${urbanist.className} text-blue-500 font-bold uppercase tracking-[0.3em] text-[10px] leading-tight`}>
                Statistics
              </h4>
            </div>

            {/* Responsive Text Sizes */}
            <h2 className={`${urbanist.className} text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight`}>
              Trusted by Thousands of <br className="hidden sm:block" />
              <span className="text-blue-600">Vehicle Owners</span>
            </h2>

            <p className={`${poppins.className} text-gray-400 text-base sm:text-lg leading-relaxed font-light max-w-xl`}>
              At <strong className="text-white font-medium">Inspect a Report</strong>, we deliver precision diagnostics and history tracking, ensuring you always stay ahead with reliable data.
            </p>

            <div className={`${poppins.className} space-y-3 sm:space-y-4`}>
                {["Instant access via VIN number", "Comprehensive accident & title records"].map((text, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.6 + (i * 0.15), duration: 0.8 }}
                        className="flex items-center gap-3 text-gray-300"
                    >
                        <CheckCircle2 className="text-blue-500 shrink-0" size={18} />
                        <span className="text-xs sm:text-sm tracking-wide">{text}</span>
                    </motion.div>
                ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="pt-2"
            >
              <button className="group cursor-pointer relative w-full sm:w-auto inline-flex justify-center items-center gap-3 bg-blue-600 text-white px-8 lg:px-9 py-4 rounded-sm font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 hover:bg-white hover:text-[#07101D] active:scale-95 shadow-lg">
                <span className="relative z-10 uppercase">View Pricing Plans</span>
                <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default StatsSection;