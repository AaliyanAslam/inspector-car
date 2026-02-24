"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Poppins, Urbanist } from "next/font/google";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-urbanist",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-poppins",
});

const services = [
  {
    title: "Bike Maintenance Report",
    description: "Inspect a Report Bike Maintenance Reports provide a detailed service history, helping you ensure peak performance and prevent unexpected issues.",
    image: "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771911965/pexels-olly-3818597_amkefd.jpg",
  },
  {
    title: "Car Maintenance Report",
    description: "Inspect a Report Car Maintenance Reports help you track service history, prevent issues, and ensure your vehicle’s reliability.",
    image: "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771873965/pexels-artempodrez-8986070_jmhtbv.jpg",
  },
  {
    title: "Truck Maintenance Report",
    description: "Inspect a Report Truck Maintenance Reports help you track service records, enhance durability, and ensure your truck stays road-ready.",
    image: "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771912009/pexels-gustavo-fring-6720532_pqsxom.jpg",
  },
  {
    title: "Yacht Maintenance Report",
    description: "Inspect a Report Yacht Maintenance Reports keep you informed about past servicing, helping you maintain peak performance and avoid costly repairs.",
    image: "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771911668/istockphoto-1085979204-612x612_jzmuvz.jpg", 
  },
  {
    title: "Jet Ski Maintenance Report",
    description: "Inspect a Report Jet Ski Maintenance Reports provide a detailed history of servicing and repairs, helping you maintain peak performance and enjoy hassle-free rides.",
    image: "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771911678/6852b81196f21648626c3166_Routine-jet-ski-maintenance-tasks_wwhnyq.jpg",
  },
  {
    title: "Boat History Report",
    description: "Inspect a Report Boat Maintenance Reports offer a complete record of past repairs and servicing, ensuring safety, reliability, and smooth operation on the water.",
    image: "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771911690/mirka-boat-maintenance-polishing-sanding-2200-1238_s50pho.webp",
  },
  {
    title: "Van Maintenance Report",
    description: "Inspect a Report expert check-up for your van covering engine, brakes, fluids & more to keep it road-ready and reliable.",
    image: "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771911698/138343_cgthro.webp",
  },
  {
    title: "Caravan Maintenance Report",
    description: "Inspect a Report provide a comprehensive overview of your caravan’s servicing and repair history, ensuring safety, reliability, and peace of mind for your travels.",
    image: "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771911707/OurVan-3_lrg3yo.jpg",
  },
];

// Smooth Animation Curve
const SMOOTH_CURVE = [0.215, 0.61, 0.355, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: SMOOTH_CURVE },
  },
};

const WhatWeDo = () => {
  return (
    <section className="w-full bg-gray-50 py-20 lg:py-32 px-4 sm:px-6 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* TOP SECTION */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-end mb-16 lg:mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: SMOOTH_CURVE }}
            className={`space-y-6 ${urbanist.className}`}
          >
            <div className="relative pl-4">
              <div className="absolute left-0 top-0 bottom-0 w-[2.5px] bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.3)]" />
              <h4 className="text-blue-600 font-bold uppercase tracking-[0.25em] text-[10px] sm:text-[11px]">
                What We Do
              </h4>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              Expert Vehicle Reports <br className="hidden sm:block" /> 
              <span className="text-blue-600 font-extrabold"> & Maintenance</span>
            </h2>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: SMOOTH_CURVE }}
            className={`text-gray-500 text-sm sm:text-base leading-relaxed lg:max-w-md ${poppins.className}`}
          >
            At <span className="text-gray-600 font-bold">Inspect a Report</span>, we provide comprehensive repair and maintenance reports for your vehicle, ensuring complete <span className="text-gray-600 font-semibold">transparency and reliability.</span>
          </motion.p>
        </div>

        {/* CARDS SECTION */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 ${poppins.className}`}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative bg-white rounded-2xl  overflow-hidden border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.08)] transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/10 transition-colors duration-500" />
              </div>

              {/* Content Area */}
              <div className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-light mb-4 sm:mb-6 line-clamp-3">
                  {service.description}
                </p>

              
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default WhatWeDo;