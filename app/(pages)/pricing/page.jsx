"use client";

import React from "react";
import { motion } from "framer-motion";
import { Urbanist, Poppins } from "next/font/google";
import { Check } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import PageTitle from "@/app/components/ui/PageTitle";
import Footer from "@/app/components/Footer";
import PaypalButton from "@/app/components/ui/PayPalButton";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-urbanist",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-poppins",
});

const pricingPlans = [
  {
    name: "Basic Plan",
    price: "59.99",
    features: [
      "Vehicle Overview",
      "Vehicle title status",
      "Vehicle mileage",
      "Vehicle ownership history",
      "Vehicle accident history",
    ],
    highlight: false,
  },
  {
    name: "Standard Plan",
    price: "74.99",
    features: [
      "Vehicle year, make, model, and trim",
      "Vehicle engine and transmission",
      "Vehicle accident history",
      "Sales Listing",
      "Vehicle title status",
    ],
    highlight: true, // "Popular" choice
  },
  {
    name: "Premium Plan",
    price: "99.99",
    features: [
      "Vehicle Full Overview",
      "Vehicle maintenance & repair costs",
      "Vehicle Specification",
      "Vehicle trade-in value",
      "Vehicle financing information",
    ],
    highlight: false,
  },
];

const PricingSection = () => {
  return (
 <>
 <Navbar/>
 <PageTitle tittle="Pricing"/>
    <section className={`py-24 bg-[#F8F9FA] ${urbanist.className}`}>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-blue-600 font-bold uppercase tracking-widest text-xs"
          >
            Pricing
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-[#1a2b3c] mt-4 mb-6"
          >
            Choose a Pricing Plan
          </motion.h2>
          <p className={`${poppins.className} text-gray-500 font-light`}>
            Transparent pricing for comprehensive vehicle intelligence. No hidden fees.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`relative flex flex-col p-8 rounded-3xl transition-all duration-300 ${
                plan.highlight 
                ? "bg-white border-2 border-blue-600 shadow-2xl shadow-blue-100" 
                : "bg-white border border-gray-100 shadow-xl shadow-gray-50"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-extrabold text-gray-900">${plan.price}</span>
                  <span className="text-gray-400 ml-2 font-medium">/report</span>
                </div>
              </div>

              {/* Feature List */}
              <ul className={`space-y-4 mb-10 grow ${poppins.className}`}>
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center">
                      <Check className="text-blue-600 w-3 h-3" strokeWidth={3} />
                    </div>
                    <span className="text-gray-600 text-sm leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              {/* <button 
                className={`w-full py-4 rounded-2xl font-bold transition-all duration-300 ${
                  plan.highlight 
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200" 
                  : "bg-gray-50 text-gray-900 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                Buy Now
              </button> */}
              {/* <PaypalButton amount={plan.price}/> */}
           
<button 
  onClick={() => window.location.href = `/checkout?plan=${encodeURIComponent(plan.name)}&price=${plan.price}`}
  className={`w-full py-4 rounded-2xl font-bold transition-all duration-300 ${
    plan.highlight 
    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200" 
    : "bg-gray-50 text-gray-900 hover:bg-gray-100 border border-gray-200"
  }`}
>
  Buy Now
</button>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <p className={`${poppins.className} text-center mt-12 text-gray-400 text-sm`}>
          Secure payment processing. Instant report delivery via email.
        </p>
      </div>
    </section>
    <Footer/>
 </>
  );
};

export default PricingSection;