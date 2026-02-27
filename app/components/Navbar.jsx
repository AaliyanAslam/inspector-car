"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus_Jakarta_Sans } from "next/font/google";
import { X, Menu } from "lucide-react";
import GlowButton from "./ui/Button";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
});

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Pricing", href: "/pricing" },
  
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    // FIX 1: Changed bg-white/5 to bg-white for visibility and used z-[100]
    <nav className={`w-full bg-white border-b border-gray-100 sticky top-0 z-100 ${jakarta.className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 sm:h-24">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 relative ">
            <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center shadow-md shadow-orange-200">
              <span className="text-white text-xs">✓</span>
            </div>
            <span className="text-xl sm:text-2xl font-bold tracking-tight">
              <span className="text-[#1a2b3c]">Inspect A</span>
              <span className="text-[#3b82f6] ml-1.5">Report</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-slate-600 hover:text-blue-600 transition-colors duration-200 font-semibold text-sm lg:text-base"
              >
                {link.name}
              </Link>
            ))}
          </div>
      <div className="hidden md:flex">
            <GlowButton />
      </div>

          {/* Mobile Hamburger Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2 rounded-lg bg-slate-50 text-slate-900 relative "
          >
            <Menu size={24} />
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Portal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* FIX 2: Increased z-index for Overlay to z-[110] */}
            <motion.div
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-110"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* FIX 3: Increased z-index for Panel to z-[120] */}
            <motion.div
              className="fixed top-0 left-0 w-[80%] max-w-[320px] h-full bg-white z-120 shadow-2xl flex flex-col"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {/* Panel Header */}
              <div className="p-6 flex items-center justify-between border-b border-slate-50">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-[10px]">✓</span>
                  </div>
                  <span className="font-bold text-slate-900 text-sm">Inspect A Report</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Links Container */}
              <motion.div 
                className="p-8 flex flex-col space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {navLinks.map((link) => (
                  <motion.div key={link.name} variants={itemVariants}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center justify-between text-lg font-bold text-slate-800 hover:text-blue-600 transition-colors"
                    >
                      {link.name}
                      <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1">→</span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Panel Footer */}
              <div className="mt-auto p-8 border-t border-slate-50">
            <GlowButton />
                
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;