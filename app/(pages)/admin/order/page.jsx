"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { Urbanist, Poppins } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, ExternalLink, Calendar,
  CreditCard, User, Mail, Phone, MapPin, Hash, Package,
  Lock, Eye, EyeOff, ShieldCheck, AlertCircle, Car
} from "lucide-react";
import Navbar from "@/app/components/Navbar";

const urbanist = Urbanist({ subsets: ["latin"], weight: ["700", "800"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

const SMOOTH = [0.215, 0.61, 0.355, 1];

// ─── Login Gate ────────────────────────────────────────────────────────────────
function LoginGate({ onAuth }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate a brief auth delay for UX polish
    await new Promise((r) => setTimeout(r, 800));

    const validUser = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
    const validPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (username === validUser && password === validPass) {
      // Store session flag (tab-scoped only, no persistence)
      sessionStorage.setItem("admin_auth", "1");
      onAuth(true);
    } else {
      setError("Invalid credentials. Access denied.");
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-[#07101D] flex items-center justify-center px-4 ${poppins.className}`}>
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: SMOOTH }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="border border-white/9 bg-white/3 backdrop-blur-sm rounded-sm overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.5)]">

          {/* Top accent bar */}
          <div className="h-0.75 bg-linear-to-r from-blue-600 via-blue-500 to-blue-400" />

          <div className="px-8 py-10 sm:px-10 sm:py-12">

            {/* Icon + Title */}
            <div className="flex flex-col items-center text-center mb-10">
              <div className="w-14 h-14 rounded-sm bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mb-5 shadow-[0_0_30px_rgba(37,99,235,0.1)]">
                <Lock size={22} className="text-blue-400" />
              </div>
              <h1 className={`${urbanist.className} text-2xl font-extrabold text-white tracking-tight mb-1.5`}>
                Admin Access
              </h1>
              <p className="text-white/30 text-xs font-light tracking-wide">
                Orders Console — Restricted Area
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">

              {/* Username */}
              <div className="space-y-1.5">
                <label className="text-white/30 text-[10px] uppercase tracking-widest font-medium flex items-center gap-1.5">
                  <User size={10} /> Username
                </label>
                <div className={`relative flex items-center border rounded-sm transition-all duration-200 ${
                  focusedField === "user"
                    ? "border-blue-500 shadow-[0_0_0_1px_rgba(59,130,246,0.25)] bg-white/[0.07]"
                    : "border-white/9 bg-white/4"
                }`}>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => { setUsername(e.target.value); setError(""); }}
                    onFocus={() => setFocusedField("user")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter username"
                    autoComplete="username"
                    className="w-full bg-transparent text-white text-sm placeholder-white/20 px-4 py-3.5 outline-none font-light"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-white/30 text-[10px] uppercase tracking-widest font-medium flex items-center gap-1.5">
                  <Lock size={10} /> Password
                </label>
                <div className={`relative flex items-center border rounded-sm transition-all duration-200 ${
                  focusedField === "pass"
                    ? "border-blue-500 shadow-[0_0_0_1px_rgba(59,130,246,0.25)] bg-white/[0.07]"
                    : "border-white/4 bg-white/5"
                }`}>
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    onFocus={() => setFocusedField("pass")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter password"
                    autoComplete="current-password"
                    className="w-full bg-transparent text-white text-sm placeholder-white/20 px-4 py-3.5 outline-none font-light pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((p) => !p)}
                    className="absolute right-3 text-white/20 hover:text-white/50 transition-colors p-1"
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-sm px-3 py-2.5"
                  >
                    <AlertCircle size={13} className="shrink-0" />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading || !username || !password}
                  className={`${urbanist.className} w-full flex items-center justify-center gap-2.5 bg-blue-600 text-white py-4 rounded-sm font-bold text-xs tracking-widest transition-all duration-300 active:scale-[0.98] shadow-[0_10px_25px_rgba(37,99,235,0.2)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:text-[#07101D]`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      AUTHENTICATING...
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={15} />
                      UNLOCK CONSOLE
                    </>
                  )}
                </button>
              </div>
            </form>

          </div>

          {/* Bottom strip */}
          <div className="px-8 py-4 border-t border-white/5 flex items-center justify-center gap-2">
            <Car size={12} className="text-white/20" />
            <span className="text-white/20 text-[10px] tracking-widest uppercase font-medium">
              Inspect a Report — Admin Portal
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Admin Orders Page ────────────────────────────────────────────────────
export default function AdminOrders() {
  const [authed, setAuthed] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Check if already authenticated this session
  useEffect(() => {
    const flag = sessionStorage.getItem("admin_auth");
    if (flag === "1") setAuthed(true);
    setAuthChecked(true);
  }, []);

  // Only subscribe to Firestore once authenticated
  useEffect(() => {
    if (!authed) return;
    const q = query(collection(db, "orders"), orderBy("orderTimestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ordersArr = [];
      querySnapshot.forEach((doc) => {
        ordersArr.push({ id: doc.id, ...doc.data() });
      });
      setOrders(ordersArr);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [authed]);

  // Prevent flash of login/dashboard before session check
  if (!authChecked) return null;

  if (!authed) {
    return <LoginGate onAuth={setAuthed} />;
  }

  const filteredOrders = orders.filter(
    (order) =>
      order.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.vin?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.firstName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`bg-[#F8F9FA] min-h-screen ${poppins.className} text-slate-900`}
    >
      <Navbar />

      <main className="max-w-350 mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 lg:mb-10 gap-6">
          <div className="space-y-1">
            <h1 className={`${urbanist.className} text-4xl font-extrabold tracking-tight text-slate-900`}>
              Orders Console
            </h1>
            <p className="text-slate-500 font-medium">Real-time overview of vehicle intelligence reports.</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Logout */}
            <button
              onClick={() => { sessionStorage.removeItem("admin_auth"); setAuthed(false); }}
              className={`${urbanist.className} inline-flex items-center gap-2 border border-slate-200 text-slate-500 hover:text-red-500 hover:border-red-300 hover:bg-red-50 px-4 py-3 rounded text-[10px] font-bold uppercase tracking-widest transition-all text-xs`}
            >
              <Lock size={13} /> Logout
            </button>

            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search email, name or VIN..."
                className="pl-10 pr-4 py-3 bg-white border border-slate-200 rounded text-sm outline-none focus:ring-4 focus:ring-blue-50/50 focus:border-blue-500 w-64 md:w-80 transition-all shadow-sm"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1 lg:gap-2 mb-5 lg:mb-10">
          <StatCard title="Revenue" value={`$${orders.reduce((acc, curr) => acc + parseFloat(curr.planPrice || 0), 0).toFixed(2)}`} icon={<CreditCard size={20} />} color="text-blue-600" bg="bg-blue-50" />
          <StatCard title="Total Orders" value={orders.length} icon={<Package size={20} />} color="text-orange-600" bg="bg-orange-50" />
          <StatCard title="Customers" value={[...new Set(orders.map((o) => o.email))].length} icon={<User size={20} />} color="text-emerald-600" bg="bg-emerald-50" />
          <StatCard title="Success Rate" value="100%" icon={<Hash size={20} />} color="text-indigo-600" bg="bg-indigo-50" />
        </div>

        {/* Table */}
        <div className="bg-white border border-slate-200 rounded shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-200 md:min-w-full">
              <thead>
                <tr className="bg-[#181C14] border-b border-slate-100">
                  {["Customer & Contact", "Order & Plan", "Location", "Vehicle Info", "Payment"].map((h, i) => (
                    <th key={i} className={`px-4 py-4 md:px-6 md:py-5 text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-white/90 ${i === 4 ? "text-right" : ""}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-24 text-slate-600 animate-pulse font-medium text-sm">
                      Loading secure data...
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-4 py-4 md:px-6 md:py-5">
                        <div className="flex flex-col gap-0.5 md:gap-1">
                          <span className="text-[11px] sm:text-xs md:text-sm font-bold text-slate-900 leading-tight">
                            {order.firstName} {order.lastName}
                          </span>
                          <div className="flex items-center gap-1.5 text-slate-500">
                            <Mail className="w-3 h-3 md:w-3.5 md:h-3.5" />
                            <span className="text-[10px] md:text-xs truncate max-w-30 md:max-w-none">{order.email}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <Phone className="w-2.5 h-2.5 md:w-3 md:h-3" />
                            <span className="text-[9px] md:text-[11px]">{order.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 md:px-6 md:py-5">
                        <div className="flex flex-col">
                          <span className="text-[9px] md:text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md self-start mb-1.5">{order.planName}</span>
                          <span className="text-[9px] md:text-[11px] font-mono text-slate-600 uppercase tracking-tighter">ID: {order.paymentId || order.id.slice(0, 12)}</span>
                          <div className="flex items-center gap-1 text-[9px] md:text-[10px] text-slate-600 mt-1">
                            <Calendar className="w-2.5 h-2.5" />
                            {new Date(order.orderDate).toLocaleDateString(undefined, { dateStyle: "medium" })}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 md:px-6 md:py-5">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5 text-slate-300 mt-0.5" />
                          <div className="flex flex-col">
                            <span className="text-[10px] md:text-xs font-semibold text-slate-700">{order.city}, {order.state}</span>
                            <span className="text-[9px] md:text-[10px] font-bold text-slate-600 uppercase tracking-widest">{order.country}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 md:px-6 md:py-5">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[8px] md:text-[10px] font-black bg-slate-900 text-white px-1.5 py-0.5 rounded uppercase">{order.service}</span>
                            <span className="text-[10px] md:text-xs font-mono font-bold text-slate-700 tracking-wider">{order.vin}</span>
                          </div>
                          <p className="text-[9px] md:text-[10px] text-emerald-600 font-bold uppercase tracking-tight flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            COMPLETED
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-4 md:px-6 md:py-5 text-right">
                        <div className="flex flex-col items-end">
                          <span className="text-sm md:text-base font-black text-slate-900">${order.planPrice}</span>
                          <span className="text-[8px] md:text-[9px] font-bold text-slate-600 uppercase mt-1">via PayPal</span>
                          <button className="mt-2 p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all group-hover:scale-110">
                            <ExternalLink className="w-3 h-3 md:w-3.5 md:h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {!loading && filteredOrders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 bg-white border border-dashed border-slate-200 rounded mt-6">
            <div className="bg-slate-50 p-4 rounded-full mb-4 text-slate-300">
              <Search size={32} />
            </div>
            <p className="text-slate-500 font-bold">No results found for "{searchTerm}"</p>
            <p className="text-slate-600 text-xs mt-1">Try searching with a different VIN or Email.</p>
          </div>
        )}
      </main>
    </motion.div>
  );
}

const StatCard = ({ title, value, icon, color, bg }) => (
  <div className="bg-white p-4 lg:p-6 rounded border border-slate-200 shadow-sm flex items-center justify-between transition-all hover:shadow-md group">
    <div className="space-y-1">
      <p className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">{title}</p>
      <h4 className="text-xl lg:text-2xl font-black text-slate-900">{value}</h4>
    </div>
    <div className={`p-4 rounded ${bg} ${color} group-hover:scale-110 transition-transform`}>{icon}</div>
  </div>
);