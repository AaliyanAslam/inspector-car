"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Poppins, Urbanist } from "next/font/google";
const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-urbanist",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300"],
  variable: "--font-poppins",
});



const services = [
  "Comprehensive Vehicle History Reports",
  "Diagnostic & Maintenance Insights",
  "VIN-Based Repair Recommendations",
  "Transparent & Reliable Service",
];

const images = [
  "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771873965/pexels-artempodrez-8986070_jmhtbv.jpg", // Replace with your "/images/car1.jpg"
  "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771873593/pexels-cottonbro-4489749_caq7iq.jpg",
  "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771873951/pexels-olly-3807277_s1wcnw.jpg",
];

const VehicleReports = () => {
  return (
    <section className="w-full bg-[#07101D] py-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP HEADING SECTION */}
        <div className={`mb-8 max-w-5xl ${urbanist.className}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
            Expert Vehicle Reports & Maintenance — 
            <span className="text-blue-500"> Anytime, Anywhere</span>
          </h2>
        </div>

        {/* MAIN GRID */}
        <div className={`grid lg:grid-cols-2 gap-16 lg:gap-12 items-start ${poppins.className}`}>

          {/* LEFT SIDE - Images & Intro */}
          <div className="space-y-6">
            <p className="text-blue-400 text-xl font-medium max-w-lg leading-relaxed">
              We realize that you lead a busy life, so we have made it easy for
              you to drop off your vehicle 24/7.
            </p>

            {/* Images Layout */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-75 rounded-xl overflow-hidden shadow-lg border border-white/10 group">
                <Image 
                  src={images[0]} 
                  alt="Inspection 1" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>

              <div className="grid gap-4">
                <div className="relative h-35.5 rounded-xl overflow-hidden shadow-lg border border-white/10 group">
                  <Image 
                    src={images[1]} 
                    alt="Inspection 2" 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                </div>
                <div className="relative h-35.5 rounded-xl overflow-hidden shadow-lg border border-white/10 group">
                  <Image 
                    src={images[2]} 
                    alt="Inspection 3" 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Content & Features */}
          <div className="space-y-10 lg:pl-8 flex flex-col justify-center h-full">
            
            <p className="text-gray-300 text-lg leading-relaxed font-light">
              We understand that your time is valuable, which is why{" "}
              <strong className="text-white font-semibold">Inspect a Report</strong>{" "}
              offers instant repair and maintenance reports for your vehicle. Enter your VIN number and get a detailed analysis of past repairs, diagnostics, and maintenance schedules for cars, trucks, and bikes — available 24/7.
            </p>

            {/* Feature List */}
            <div className="">
              <div className="relative pl-4 mb-3">
  {/* Vertical Glowing Line - Ab hamesha full height rahegi */}
  <div className="absolute left-0 top-0 bottom-0 w-[2.5px] bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)]" />
  
  <h4 className="text-blue-400 font-bold uppercase tracking-[0.25em] text-[11px] leading-tight">
    What We Offer
  </h4>
  
  {/* Underline Gradient - Subtle finish ke liye */}
  <div className="h-px w-16 bg-linear-to-r from-blue-500/40 via-blue-500/10 to-transparent mt-1.5" />
</div>

              <ul className="space-y-5">
                {services.map((service, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-200">
                    <span className="mt-0.5 w-6 h-6 shrink-0 flex  items-center justify-center rounded-full  text-yellow-400   text-xs font-bold">
                      ✓
                    </span>
                    <span className="font-medium">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Button */}
            <div>
              <button className="group inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-sm font-semibold hover:bg-white hover:text-black cursor-pointer transition-all duration-300 active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)]">
                Explore More
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default VehicleReports;