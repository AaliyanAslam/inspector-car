"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Urbanist, Poppins } from "next/font/google";
import {  Users2 } from "lucide-react";

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

const team = [
  {
    name: "Edward John",
    role: "Engine & Performance Specialist",
    image: "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771957179/Team-2_smx3pi.webp",
  },
  {
    name: "Chris Danielle",
    role: "Vehicle Inspection & Report Specialist",
    image: "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771957186/Team-4_s8ay0p.webp",
  },
  {
    name: "Martin Yoris",
    role: "Lead Diagnostic Technician",
    image: "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771957194/Team-1_dabtxp.webp",
  },
];

const SMOOTH_CURVE = [0.215, 0.61, 0.355, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: SMOOTH_CURVE },
  },
};

const OurTeam = () => {
  return (
    <section className="w-full bg-[#07101D] py-20 lg:py-32 px-4 sm:px-6 lg:px-12 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col items-center text-center mb-16 lg:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: SMOOTH_CURVE }}
            className="flex flex-col items-center"
          >
<Users2 size={24} className="text-blue-600 mb-2" fill="blue"/>  
          
            
            <h4 className={`${urbanist.className} text-blue-400 font-bold uppercase tracking-[0.3em] text-[10px] sm:text-[11px] mb-4`}>
              Our Team
            </h4>

            <h2 className={`${urbanist.className} text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6`}>
              Certified <span className="text-blue-500">Technicians</span>
            </h2>
            
            <p className={`${poppins.className} text-gray-400 text-sm sm:text-base max-w-xl font-light leading-relaxed`}>
              Meet the experts behind our comprehensive vehicle history reports and precision diagnostics.
            </p>
          </motion.div>
        </div>

        {/* TEAM GRID */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12"
        >
          {team.map((member, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              className="group relative flex flex-col items-center"
            >
              {/* Image Container with Glow Effect */}
              <div className="relative w-full aspect-4/5 rounded-2xl overflow-hidden border border-white/5 mb-8 group-hover:border-blue-500/30 transition-all duration-700 shadow-2xl">
                {/* Subtle Hover Overlay */}
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 z-10 transition-colors duration-500" />
                
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />

                {/* Bottom Gradient for Text Legibility */}
                <div className="absolute inset-0 bg-linear-to-t from-[#07101D]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Text Content */}
              <div className="text-center space-y-3 px-4">
                <h3 className={`${urbanist.className} text-2xl sm:text-3xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300`}>
                  {member.name}
                </h3>
                
                <div className="flex items-center justify-center gap-4">
                    <div className="h-[1.5px] w-6 bg-blue-600/30 group-hover:w-10 transition-all duration-500" />
                    <p className={`${poppins.className} text-blue-400 text-xs sm:text-sm font-semibold tracking-wider uppercase`}>
                        {member.role}
                    </p>
                    <div className="h-[1.5px] w-6 bg-blue-600/30 group-hover:w-10 transition-all duration-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default OurTeam;