"use client";

import { motion } from "framer-motion";
import { Car } from "lucide-react"; // Custom ya Lucide Car component

const GlowButton = ({ text = "Start Vehicle Check" }) => {
  return (
    // Yahan humne motion.button use kiya hai taake pooray button ka hover track ho sake
    <motion.button 
      initial="initial"
      whileHover="hover"
      className="group relative cursor-pointer bg-neutral-200 rounded-full p-0.5 overflow-hidden"
    >

      {/* Outer Soft Glow */}
      <span className="absolute inset-0 rounded-full overflow-hidden">
        <span className="absolute inset-0 pointer-events-none">
          <span
            className="block -translate-x-1/2 -translate-y-1/3 w-24 h-24 blur-xl"
            style={{
              background: "linear-gradient(135deg, #2563eb, #1d4ed8, #3b82f6)",
            }}
          />
        </span>
      </span>

      {/* Moving Glow Strip */}
      <span className="absolute inset-0 pointer-events-none">
        <span
          className="block h-full w-12 blur-xl -translate-x-1/2 rounded-full opacity-70 group-hover:translate-x-[250%] transition-transform duration-700 ease-out"
          style={{
            background: "linear-gradient(135deg, #2563eb, #1d4ed8, #3b82f6)",
          }}
        />
      </span>

      {/* Button Content */}
      <span className="relative z-10 flex items-center gap-2 bg-white rounded-full py-3 px-6 overflow-hidden">

        {/* Car Animation */}
        <motion.span
          variants={{
            initial: { x: -5 },     // Normal position
            hover: { x: 4 }       // Hover hone par 10px right jayega
          }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <Car size={18} className="text-blue-600" />
        </motion.span>

        <span className="text-sm font-medium bg-linear-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
          {text}
        </span>

      </span>
    </motion.button>
  );
};

export default GlowButton;