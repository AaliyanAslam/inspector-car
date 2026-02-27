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
      
      <main className="max-w-350 mx-auto px-4 py-8">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 lg:mb-10 gap-6">
          <div className="space-y-1">
            <h1 className={`${urbanist.className} text-4xl font-extrabold tracking-tight text-slate-900`}>
              Orders Console
            </h1>
            <p className="text-slate-500 font-medium">Real-time overview of vehicle intelligence reports.</p>
          </div>
          
          <div className="flex justify-center items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search email, name or VIN..." 
                className="pl-10  pr-4 py-3 bg-white border border-slate-200 rounded text-sm outline-none focus:ring-4 focus:ring-blue-50/50 focus:border-blue-500 w-70 md:w-80 transition-all shadow-sm"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1 lg:gap-2 mb-5 lg:mb-10">
          <StatCard title="Revenue" value={`$${orders.reduce((acc, curr) => acc + parseFloat(curr.planPrice || 0), 0).toFixed(2)}`} icon={<CreditCard size={20} />} color="text-blue-600" bg="bg-blue-50" />
          <StatCard title="Total Orders" value={orders.length} icon={<Package size={20} />} color="text-orange-600" bg="bg-orange-50" />
          <StatCard title="Customers" value={[...new Set(orders.map(o => o.email))].length} icon={<User size={20} />} color="text-emerald-600" bg="bg-emerald-50" />
          <StatCard title="Success Rate" value="100%" icon={<Hash size={20} />} color="text-indigo-600" bg="bg-indigo-50" />
        </div>

        {/* Main Table Container */}
     <div className="bg-white border border-slate-200 rounded shadow-sm overflow-hidden">
  <div className="overflow-x-auto">
    <table className="w-full text-left border-collapse min-w-200 md:min-w-full">
      <thead>
        <tr className="bg-[#181C14] border-b border-slate-100">
          <th className="px-4 py-4 md:px-6 md:py-5 text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-white/90">
            Customer & Contact
          </th>
          <th className="px-4 py-4 md:px-6 md:py-5 text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-white/90">
            Order & Plan
          </th>
          <th className="px-4 py-4 md:px-6 md:py-5 text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-white/90">
            Location
          </th>
          <th className="px-4 py-4 md:px-6 md:py-5 text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-white/90">
            Vehicle Info
          </th>
          <th className="px-4 py-4 md:px-6 md:py-5 text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-white/90 text-right">
            Payment
          </th>
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
              {/* Customer Info */}
              <td className="px-4 py-4 md:px-6 md:py-5">
                <div className="flex flex-col gap-0.5 md:gap-1">
                  <span className="text-[11px] sm:text-xs md:text-sm font-bold text-slate-900 leading-tight">
                    {order.firstName} {order.lastName}
                  </span>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Mail className="w-3 h-3 md:w-3.5 md:h-3.5" />
                    <span className="text-[10px] md:text-xs truncate max-w-30 md:max-w-none">
                      {order.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Phone className="w-2.5 h-2.5 md:w-3 md:h-3" />
                    <span className="text-[9px] md:text-[11px]">{order.phone}</span>
                  </div>
                </div>
              </td>

              {/* Order & Plan */}
              <td className="px-4 py-4 md:px-6 md:py-5">
                <div className="flex flex-col">
                  <span className="text-[9px] md:text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md self-start mb-1.5">
                    {order.planName}
                  </span>
                  <span className="text-[9px] md:text-[11px] font-mono text-slate-600 uppercase tracking-tighter">
                    ID: {order.paymentId || order.id.slice(0, 12)}
                  </span>
                  <div className="flex items-center gap-1 text-[9px] md:text-[10px] text-slate-600 mt-1">
                    <Calendar className="w-2.5 h-2.5" />
                    {new Date(order.orderDate).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                  </div>
                </div>
              </td>

              {/* Location */}
              <td className="px-4 py-4 md:px-6 md:py-5">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5 text-slate-300 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-[10px] md:text-xs font-semibold text-slate-700">
                      {order.city}, {order.state}
                    </span>
                    <span className="text-[9px] md:text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                      {order.country}
                    </span>
                  </div>
                </div>
              </td>

              {/* Vehicle Info */}
              <td className="px-4 py-4 md:px-6 md:py-5">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] md:text-[10px] font-black bg-slate-900 text-white px-1.5 py-0.5 rounded uppercase">
                      {order.service}
                    </span>
                    <span className="text-[10px] md:text-xs font-mono font-bold text-slate-700 tracking-wider">
                      {order.vin}
                    </span>
                  </div>
                  <p className="text-[9px] md:text-[10px] text-emerald-600 font-bold uppercase tracking-tight flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    COMPLETED
                  </p>
                </div>
              </td>

              {/* Payment */}
              <td className="px-4 py-4 md:px-6 md:py-5 text-right">
                <div className="flex flex-col items-end">
                  <span className="text-sm md:text-base font-black text-slate-900">
                    ${order.planPrice}
                  </span>
                  <span className="text-[8px] md:text-[9px] font-bold text-slate-600 uppercase mt-1">
                    via PayPal
                  </span>
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
    </div>
  );
}

const StatCard = ({ title, value, icon, color, bg }) => (
  <div className="bg-white p-4 lg:p-6 rounded border border-slate-200 shadow-sm flex items-center justify-between transition-all hover:shadow-md group">
    <div className="space-y-1">
      <p className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">{title}</p>
      <h4 className="text-xl lg:text-2xl font-black text-slate-900">{value}</h4>
    </div>
    <div className={`p-4 rounded ${bg} ${color} group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
  </div>
);