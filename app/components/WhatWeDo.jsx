"use client";

import Image from "next/image";
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
  {
    title: "Bike Maintenance Report",
    description:
      "Inspect a Report Bike Maintenance Reports provide a detailed service history, helping you ensure peak performance and prevent unexpected issues.",
    image: "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771911965/pexels-olly-3818597_amkefd.jpg",
  },
  {
    title: "Car Maintenance Report",
    description:
      "Inspect a Report Car Maintenance Reports help you track service history, prevent issues, and ensure your vehicle’s reliability.",
    image: "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771873965/pexels-artempodrez-8986070_jmhtbv.jpg",
  },
  {
    title: "Truck Maintenance Report",
    description:
      "Inspect a Report Truck Maintenance Reports help you track service records, enhance durability, and ensure your truck stays road-ready.",
    image: "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771912009/pexels-gustavo-fring-6720532_pqsxom.jpg",
  },
  {
    title: "Yacht Maintenance Report",
    description:
      "Inspect a Report Yacht Maintenance Reports keep you informed about past servicing, helping you maintain peak performance and avoid costly repairs.",
    image: "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771911668/istockphoto-1085979204-612x612_jzmuvz.jpg", 
  },
  {
    title: "Jet Ski Maintenance Report",
    description:
      "Inspect a Report Jet Ski Maintenance Reports provide a detailed history of servicing and repairs, helping you maintain peak performance and enjoy hassle-free rides.",
    image: "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771911678/6852b81196f21648626c3166_Routine-jet-ski-maintenance-tasks_wwhnyq.jpg",
  },
  {
    title: "Boat History Report",
    description:
      "Inspect a Report Boat Maintenance Reports offer a complete record of past repairs and servicing, ensuring safety, reliability, and smooth operation on the water.",
    image: "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771911690/mirka-boat-maintenance-polishing-sanding-2200-1238_s50pho.webp",
  },
  {
    title: "Van Maintenance Report",
    description:
      "Inspect a Report expert check-up for your van covering engine, brakes, fluids & more to keep it road-ready and reliable.",
    image: "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771911698/138343_cgthro.webp",
  },
  {
    title: "Caravan Maintenance Report",
    description:
      "Inspect a Report provide a comprehensive overview of your caravan’s servicing and repair history, ensuring safety, reliability, and peace of mind for your travels.",
    image: "https://res.cloudinary.com/dlyidp2yt/image/upload/v1771911707/OurVan-3_lrg3yo.jpg",
  },
];
const WhatWeDo = () => {
  return (
    <section className="w-full bg-gray-50 py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">

        {/* TOP SECTION */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
          <div className={`space-y-6 ${urbanist.className}`}>
            {/* Signature Vertical Accent - Fixed (No Motion) */}
            <div className="relative pl-4">
              <div className="absolute left-0 top-0 bottom-0 w-[2.5px] bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.3)]" />
              <h4 className="text-blue-600 font-bold uppercase tracking-[0.25em] text-[11px]">
                What We Do
              </h4>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              Expert Vehicle Reports <br /> 
              <span className="text-blue-600 font-extrabold"> & Maintenance</span>
            </h2>
          </div>

          <p className={`text-gray-500 text-md leading-relaxed lg:max-w-md ${poppins.className}`}>
           At <span className="text-gray-600 font-bold">Inspect a Report</span>, we provide comprehensive repair and maintenance reports for your vehicle, ensuring complete <span className="text-gray-600 font-semibold">transparency and reliability.</span> Our expert services help you stay ahead of potential issues, track repair history, and <span className="text-gray-600 font-semibold">optimize vehicle performance.</span>
          </p>
        </div>

        {/* CARDS SECTION */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 ${poppins.className}`}>
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Subtle Blue Tint on Hover */}
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors duration-500" />
              </div>

              {/* Content Area */}
              <div className="p-8">
            

                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed font-light mb-6">
                  {service.description}
                </p>

          
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhatWeDo;