"use client";

import React from "react";
import { motion } from "framer-motion";
import { Urbanist, Poppins } from "next/font/google";
import Link from "next/link";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-urbanist",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-poppins",
});

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", href: "/" },
        { name: "Pricing", href: "/pricing" },
        { name: "About Us", href: "/" },
      ],
    },
    {
      title: "Useful Links",
      links: [
        { name: "Our Team", href: "/" },
        { name: "Contact Us", href: "/" },
        { name: "Privacy & Policies", href: "/" },
      ],
    },
  ];

  return (
    <footer className={`bg-[#0B1727] text-gray-400 py-16 lg:pt-24 lg:pb-12 px-6 sm:px-12 overflow-hidden ${urbanist.className}`}>
      <div className="max-w-7xl mx-auto">
        
        {/* TOP SECTION: LOGO & LINKS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* BRAND COLUMN */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6 group cursor-pointer">
              <div className="relative h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:rotate-6 transition-transform">
                 <span className="text-white font-bold text-xl">i</span>
              </div>
              <h2 className="text-white text-2xl font-extrabold tracking-tight">
                Inspect A <span className="text-blue-500">Report</span>
              </h2>
            </div>
            <p className={`${poppins.className} text-gray-500 text-base leading-relaxed max-w-sm mb-8 font-light`}>
              Get detailed VIN reports, vehicle specifications, and safety updates. 
              Serving the USA, Canada, Europe, and more.
            </p>
            <div className="flex gap-4">
               {/* Placeholder for Socials if needed */}
               {["Twitter", "LinkedIn", "Instagram"].map((social) => (
                 <div key={social} className="h-10 w-10 rounded-full border border-gray-800 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-colors cursor-pointer group">
                    <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-white" />
                 </div>
               ))}
            </div>
          </div>

          {/* DYNAMIC LINK COLUMNS */}
          {footerLinks.map((section) => (
            <div key={section.title} className="lg:col-span-2">
              <h4 className="text-white font-bold text-lg mb-7 relative inline-block">
                {section.title}
                <span className="absolute -bottom-2 left-0 h-0.5 w-6 bg-blue-600 rounded-full" />
              </h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="hover:text-blue-500 transition-colors duration-300 text-[15px] font-poppins font-light"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* INFORMATIONS COLUMN */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-lg mb-7 relative inline-block">
              Informations
              <span className="absolute -bottom-2 left-0 h-0.5 w-6 bg-blue-600 rounded-full" />
            </h4>
            <div className="space-y-5">
              <a 
                href="mailto:inspectareports@gmail.com" 
                className="flex items-center gap-4 group hover:text-white transition-colors"
              >
                <div className="h-10 w-10 rounded-lg bg-gray-900 flex items-center justify-center group-hover:bg-blue-600/10 group-hover:text-blue-500 transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-[14px] break-all font-poppins font-light">inspectareports@gmail.com</span>
              </a>
              {/* Optional secondary contact info */}
              <div className="flex items-center gap-4 group">
                <div className="h-10 w-10 rounded-lg bg-gray-900 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-[14px] font-poppins font-light">Global Vehicle Intelligence</span>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION: COPYRIGHT */}
        <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className={`${poppins.className} text-gray-600 text-sm font-light`}>
            Copyright © {currentYear} <span className="text-gray-400 font-medium">Aaliyan Aslam</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-xs uppercase tracking-widest font-bold text-gray-600">
             <Link href="/terms" className="hover:text-blue-500 transition-colors">Terms</Link>
             <Link href="/cookies" className="hover:text-blue-500 transition-colors">Cookies</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;