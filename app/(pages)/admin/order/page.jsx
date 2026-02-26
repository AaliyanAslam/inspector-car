"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { Urbanist, Poppins } from "next/font/google";
import { 
  Search, Filter, ExternalLink, Calendar, 
  CreditCard, User, Mail, Phone, MapPin, Hash, Package
} from "lucide-react";
import Navbar from "@/app/components/Navbar";

const urbanist = Urbanist({ subsets: ["latin"], weight: ["700", "800"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
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
  }, []);

  const filteredOrders = orders.filter(order => 
    order.email?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    order.vin?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.firstName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`bg-[#F8F9FA] min-h-screen ${poppins.className} text-slate-900`}>
      <Navbar />
      
      <main className="max-w-[1400px] mx-auto px-4 py-8">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-1">
            <h1 className={`${urbanist.className} text-4xl font-extrabold tracking-tight text-slate-900`}>
              Orders Console
            </h1>
            <p className="text-slate-500 font-medium">Real-time overview of vehicle intelligence reports.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search email, name or VIN..." 
                className="pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-blue-50/50 focus:border-blue-500 w-full md:w-80 transition-all shadow-sm"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <StatCard title="Revenue" value={`$${orders.reduce((acc, curr) => acc + parseFloat(curr.planPrice || 0), 0).toFixed(2)}`} icon={<CreditCard size={20} />} color="text-blue-600" bg="bg-blue-50" />
          <StatCard title="Total Orders" value={orders.length} icon={<Package size={20} />} color="text-orange-600" bg="bg-orange-50" />
          <StatCard title="Customers" value={[...new Set(orders.map(o => o.email))].length} icon={<User size={20} />} color="text-emerald-600" bg="bg-emerald-50" />
          <StatCard title="Success Rate" value="100%" icon={<Hash size={20} />} color="text-indigo-600" bg="bg-indigo-50" />
        </div>

        {/* Main Table Container */}
        <div className="bg-white border border-slate-200 rounded-[24px] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400">Customer & Contact</th>
                  <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400">Order & Plan</th>
                  <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400">Location</th>
                  <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400">Vehicle Info</th>
                  <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400 text-right">Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr><td colSpan="5" className="text-center py-24 text-slate-400 animate-pulse font-medium">Loading secure data...</td></tr>
                ) : filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                    {/* Customer Info */}
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-bold text-slate-900">{order.firstName} {order.lastName}</span>
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <Mail size={12} />
                          <span className="text-xs">{order.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <Phone size={12} />
                          <span className="text-[11px]">{order.phone}</span>
                        </div>
                      </div>
                    </td>

                    {/* Order & Plan */}
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md self-start mb-1">
                          {order.planName}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-tighter">ID: {order.paymentId || order.id.slice(0, 12)}</span>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1">
                          <Calendar size={10} />
                          {new Date(order.orderDate).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                        </div>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="px-6 py-5">
                      <div className="flex items-start gap-2">
                        <MapPin size={14} className="text-slate-300 mt-0.5" />
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-slate-700">{order.city}, {order.state}</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{order.country}</span>
                        </div>
                      </div>
                    </td>

                    {/* Vehicle Info */}
                    <td className="px-6 py-5">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                           <span className="text-[10px] font-black bg-slate-900 text-white px-1.5 py-0.5 rounded uppercase">{order.service}</span>
                           <span className="text-xs font-mono font-bold text-slate-700 tracking-wider">{order.vin}</span>
                        </div>
                        <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-tight">Status: COMPLETED</p>
                      </div>
                    </td>

                    {/* Payment */}
                    <td className="px-6 py-5 text-right">
                      <div className="flex flex-col items-end">
                        <span className="text-base font-black text-slate-900">${order.planPrice}</span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase mt-1">via PayPal</span>
                        <button className="mt-2 p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                          <ExternalLink size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {!loading && filteredOrders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 bg-white border border-dashed border-slate-200 rounded-[24px] mt-6">
            <div className="bg-slate-50 p-4 rounded-full mb-4 text-slate-300">
               <Search size={32} />
            </div>
            <p className="text-slate-500 font-bold">No results found for "{searchTerm}"</p>
            <p className="text-slate-400 text-xs mt-1">Try searching with a different VIN or Email.</p>
          </div>
        )}
      </main>
    </div>
  );
}

const StatCard = ({ title, value, icon, color, bg }) => (
  <div className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm flex items-center justify-between transition-all hover:shadow-md group">
    <div className="space-y-1">
      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">{title}</p>
      <h4 className="text-2xl font-black text-slate-900">{value}</h4>
    </div>
    <div className={`p-4 rounded-2xl ${bg} ${color} group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
  </div>
);