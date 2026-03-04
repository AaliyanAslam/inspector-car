"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Car,
  CheckCircle2,
  Send,
  Clock,
  Shield,
  Zap,
} from "lucide-react";

import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { Urbanist, Poppins } from "next/font/google";

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

const SMOOTH_CURVE = [0.215, 0.61, 0.355, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: SMOOTH_CURVE },
  },
};

const contactInfo = [
  {
    icon: Mail,
    label: "Email Us",
    value: "reportmyvehicle@gmail.com",
    href: "mailto:reportmyvehicle@gmail.com",
    description: "We reply within 24 hours",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Under 24 Hours",
    description: "Fast, reliable support",
  },
  {
    icon: Shield,
    label: "Data Privacy",
    value: "100% Secure",
    description: "Your info stays private",
  },
];

const features = [
  "VIN-Based Vehicle History Reports",
  "Expert Repair Recommendations",
  "Diagnostic & Maintenance Insights",
  "Transparent & Trusted Service",
];

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    vin: "",
    message: "",
  });

  const [focused, setFocused] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (formData.vin && formData.vin.length !== 17)
      newErrors.vin = "VIN must be exactly 17 characters";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      setLoading(true);
      await addDoc(collection(db, "contactMessages"), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || "Not provided",
        subject: formData.subject || "No subject",
        vin: formData.vin || "Not provided",
        message: formData.message,
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", vin: "", message: "" });
    } catch (error) {
      console.error("Firestore error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name])
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const inputBase =
    "w-full bg-white/[0.04] border text-white text-sm placeholder-white/20 rounded-sm px-4 py-3.5 outline-none transition-all duration-300 font-light";

  const getInputClass = (name) =>
    `${inputBase} ${
      focused === name
        ? "border-blue-500 shadow-[0_0_0_1px_rgba(59,130,246,0.25)] bg-white/[0.07]"
        : errors[name]
        ? "border-red-500/60"
        : "border-white/10 hover:border-white/25"
    }`;

  return (
    <section
      className={`w-full bg-[#07101D] py-20 lg:py-28 px-4 sm:px-6 lg:px-12 border-t border-white/5 overflow-hidden ${poppins.className}`}
    >
      <div className="max-w-7xl mx-auto">

        {/* ── SECTION HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: SMOOTH_CURVE }}
          className={`mb-12 lg:mb-16 max-w-5xl ${urbanist.className}`}
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
            Get In Touch — We're Ready{" "}
            <span className="text-blue-500">To Help You</span>
          </h2>
        </motion.div>

        {/* ── MAIN GRID ── */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-start">

          {/* ── LEFT: Info Panel ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            className="space-y-10"
          >
            {/* Intro */}
            <motion.p
              variants={fadeUp}
              className="text-blue-400 text-sm sm:text-xl font-medium max-w-lg leading-relaxed"
            >
              Have a question about your vehicle? Send us a message and our
              experts will get back to you promptly.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-gray-400 text-sm sm:text-base leading-relaxed font-light"
            >
              Whether you need a full vehicle history report, maintenance
              insights, or repair recommendations —{" "}
              <strong className="text-white font-semibold">
                Inspect a Report
              </strong>{" "}
              is here to provide transparent and reliable answers. Just drop us
              a message with your VIN and we'll handle the rest.
            </motion.p>

            {/* What We Offer */}
            <motion.div variants={fadeUp} className="space-y-5">
              <div className="relative pl-4">
                <div className="absolute left-0 top-0 bottom-0 w-[2.5px] bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)]" />
                <h4
                  className={`${urbanist.className} text-blue-400 font-bold uppercase tracking-[0.25em] text-[10px] sm:text-[11px]`}
                >
                  What We Offer
                </h4>
              </div>

              <ul className="grid gap-3">
                {features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    variants={fadeUp}
                    className="flex items-start gap-2.5 text-gray-300"
                  >
                    <div className="mt-0.5 shrink-0">
                      <CheckCircle2 size={17} className="text-blue-500" />
                    </div>
                    <span className="text-sm sm:text-base font-medium">
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Cards */}
            <motion.div variants={fadeUp} className="space-y-3">
              {contactInfo.map((item, idx) => {
                const Icon = item.icon;
                const content = (
                  <div
                    key={idx}
                    className="flex items-center gap-4 bg-white/3 border border-white/8 rounded-sm px-5 py-4 hover:border-blue-500/30 hover:bg-white/6 transition-all duration-300 group"
                  >
                    <div className="shrink-0 w-10 h-10 rounded-sm bg-blue-600/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-600/20 transition-colors duration-300">
                      <Icon size={18} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white/40 text-[10px] uppercase tracking-widest font-medium">
                        {item.label}
                      </p>
                      <p className={`text-white text-sm font-semibold mt-0.5 ${urbanist.className}`}>
                        {item.value}
                      </p>
                      <p className="text-white/30 text-xs mt-0.5 font-light">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );

                return item.href ? (
                  <a href={item.href} key={idx} className="block">
                    {content}
                  </a>
                ) : (
                  <div key={idx}>{content}</div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Form ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
            className="lg:pl-6"
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5 bg-white/2 border border-white/8 rounded-sm p-6 sm:p-8"
                >
                  {/* Header inside card */}
                  <motion.div variants={fadeUp} className="mb-6">
                    <div className="relative pl-4 mb-3">
                      <div className="absolute left-0 top-0 bottom-0 w-[2.5px] bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)]" />
                      <h4
                        className={`${urbanist.className} text-blue-400 font-bold uppercase tracking-[0.25em] text-[10px] sm:text-[11px]`}
                      >
                        Send A Message
                      </h4>
                    </div>
                    <p className="text-white/30 text-xs font-light">
                      Fields marked with * are required.
                    </p>
                  </motion.div>

                  {/* Name + Email row */}
                  <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/40 text-[10px] uppercase tracking-widest block mb-2">
                        Full Name *
                      </label>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        className={getInputClass("name")}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-white/40 text-[10px] uppercase tracking-widest block mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        className={getInputClass("email")}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                  </motion.div>

                  {/* Phone + Subject row */}
                  <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/40 text-[10px] uppercase tracking-widest block mb-2">
                        Phone (Optional)
                      </label>
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocused("phone")}
                        onBlur={() => setFocused(null)}
                        className={getInputClass("phone")}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div>
                      <label className="text-white/40 text-[10px] uppercase tracking-widest block mb-2">
                        Subject (Optional)
                      </label>
                      <input
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => setFocused("subject")}
                        onBlur={() => setFocused(null)}
                        className={getInputClass("subject")}
                        placeholder="Vehicle report inquiry"
                      />
                    </div>
                  </motion.div>

                  {/* VIN */}
                  <motion.div variants={fadeUp}>
                    <label className="text-white/40 text-[10px] uppercase tracking-widest block mb-2">
                      VIN Number (Optional)
                    </label>
                    <div className="relative">
                      <input
                        name="vin"
                        maxLength={17}
                        value={formData.vin}
                        onChange={handleChange}
                        onFocus={() => setFocused("vin")}
                        onBlur={() => setFocused(null)}
                        className={`${getInputClass("vin")} tracking-widest uppercase pr-14`}
                        placeholder="17-CHARACTER VIN"
                      />
                      <span
                        className={`absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-medium tabular-nums transition-colors duration-200 ${
                          formData.vin.length === 17
                            ? "text-blue-400"
                            : "text-white/20"
                        }`}
                      >
                        {formData.vin.length}/17
                      </span>
                    </div>
                    {errors.vin && (
                      <p className="text-red-400 text-xs mt-1">{errors.vin}</p>
                    )}
                  </motion.div>

                  {/* Message */}
                  <motion.div variants={fadeUp}>
                    <label className="text-white/40 text-[10px] uppercase tracking-widest block mb-2">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      className={`${getInputClass("message")} resize-none`}
                      placeholder="Describe your inquiry or vehicle issue..."
                    />
                    {errors.message && (
                      <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                    )}
                  </motion.div>

                  {/* Submit */}
                  <motion.div variants={fadeUp} className="pt-1">
                    <button
                      type="submit"
                      disabled={loading}
                      className="cursor-pointer group w-full inline-flex items-center justify-center gap-3 bg-blue-600 text-white px-9 py-4 rounded-sm font-bold text-xs sm:text-sm tracking-widest hover:bg-white hover:text-[#07101D] transition-all duration-300 active:scale-[0.98] shadow-[0_10px_20px_rgba(37,99,235,0.2)] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          SENDING...
                        </>
                      ) : (
                        <>
                          SEND MESSAGE
                          <ArrowRight
                            size={16}
                            className="group-hover:translate-x-1 transition-transform duration-300"
                          />
                        </>
                      )}
                    </button>
                    <p className="text-white/20 text-[10px] text-center mt-3 font-light">
                      By submitting, you agree to our privacy policy.
                    </p>
                  </motion.div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: SMOOTH_CURVE }}
                  className="bg-white/2 border border-white/8 rounded-sm p-10 sm:p-14 text-center space-y-5"
                >
                  <div className="w-16 h-16 rounded-sm bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={30} className="text-blue-400" />
                  </div>
                  <div>
                    <h3
                      className={`${urbanist.className} text-white text-2xl font-extrabold tracking-tight mb-2`}
                    >
                      Message Sent!
                    </h3>
                    <p className="text-gray-400 text-sm font-light leading-relaxed">
                      Thank you for reaching out. Our team will review your
                      message and respond within{" "}
                      <strong className="text-white font-semibold">24 hours</strong>.
                    </p>
                  </div>
                  <div className="pt-2">
                    <a
                      href="mailto:reportmyvehicle@gmail.com"
                      className={`${urbanist.className} text-blue-400 text-xs tracking-widest font-bold uppercase hover:text-blue-300 transition-colors duration-200 inline-flex items-center gap-2`}
                    >
                      <Mail size={13} />
                      reportmyvehicle@gmail.com
                    </a>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-white/30 text-xs hover:text-white/60 transition-colors duration-200 underline underline-offset-2"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;