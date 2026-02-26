"use client";

import React from "react";
import { motion } from "framer-motion";
import { Urbanist, Poppins } from "next/font/google";
import { Check } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import PageTitle from "@/app/components/ui/PageTitle";
import Footer from "@/app/components/Footer";

const urbanist = Urbanist({ subsets: ["latin"], weight: ["600", "700", "800"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500"] });

// exported to be used in checkout
export const pricingPlans = [
  {
    id: "basic",
    name: "Basic Plan",
    price: "59.99",
    features: ["Vehicle Overview", "Vehicle title status", "Vehicle mileage", "Vehicle ownership history", "Vehicle accident history"],
    highlight: false,
  },
  {
    id: "standard",
    name: "Standard Plan",
    price: "74.99",
    features: ["Vehicle year, make, model, and trim", "Vehicle engine and transmission", "Vehicle accident history", "Sales Listing", "Vehicle title status"],
    highlight: true,
  },
  {
    id: "premium",
    name: "Premium Plan",
    price: "99.99",
    features: ["Vehicle Full Overview", "Vehicle maintenance & repair costs", "Vehicle Specification", "Vehicle trade-in value", "Vehicle financing information"],
    highlight: false,
  },
];

export default function PricingSection() {
  return (
    <>
      <Navbar />
      <PageTitle tittle="Pricing" />
      <section className={`py-16 md:py-24 bg-[#F8F9FA] ${urbanist.className}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.span className="text-blue-600 font-bold uppercase tracking-widest text-xs">Pricing</motion.span>
            <motion.h2 className="text-4xl md:text-5xl font-extrabold text-[#1a2b3c] mt-4 mb-6">Choose a Pricing Plan</motion.h2>
            <p className={`${poppins.className} text-gray-500 font-light`}>Comprehensive vehicle intelligence. No hidden fees.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col p-8 rounded-3xl bg-white transition-all ${
                  plan.highlight ? "border-2 border-blue-600 shadow-2xl" : "border border-gray-100 shadow-xl"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Most Popular</div>
                )}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-extrabold text-gray-900">${plan.price}</span>
                    <span className="text-gray-400 ml-2 font-medium">/report</span>
                  </div>
                </div>
                <ul className={`space-y-4 mb-10 grow ${poppins.className}`}>
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center">
                        <Check className="text-blue-600 w-3 h-3" strokeWidth={3} />
                      </div>
                      <span className="text-gray-600 text-sm leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => (window.location.href = `/checkout?plan=${plan.id}`)}
                  className={`w-full py-4 rounded-2xl font-bold transition-all ${
                    plan.highlight ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200" : "bg-gray-50 text-gray-900 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  Buy Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}