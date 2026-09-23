"use client";

import Link from "next/link";
import {
  Package, Star, MapPin, CreditCard, Settings,
  ShieldCheck, Gift, RotateCcw, Bell
} from "lucide-react";

const accountItems = [
  { icon: Package, title: "Your Orders", desc: "Track, return, or buy things again", href: "/orders" },
  { icon: ShieldCheck, title: "Login & security", desc: "Edit login, name, and mobile number", href: "#" },
  { icon: MapPin, title: "Your addresses", desc: "Edit addresses for orders and gifts", href: "#" },
  { icon: CreditCard, title: "Payment options", desc: "Edit or add payment methods", href: "#" },
  { icon: Star, title: "Prime membership", desc: "Manage your Prime membership", href: "#" },
  { icon: Bell, title: "Notification preferences", desc: "Manage alerts for orders and deals", href: "#" },
  { icon: Gift, title: "Gift cards & registry", desc: "View balance or redeem a card", href: "#" },
  { icon: RotateCcw, title: "Returns & refunds", desc: "Check status of a refund", href: "#" },
  { icon: Settings, title: "Account settings", desc: "Preferences, language, & more", href: "#" },
];

export default function AccountPage() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-[#0F1111] mb-6">Your Account</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {accountItems.map(({ icon: Icon, title, desc, href }) => (
          <Link
            key={title}
            href={href}
            className="bg-white rounded border border-gray-200 p-4 hover:shadow-md transition-shadow flex items-start gap-4 group"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded flex-shrink-0">
              <Icon size={22} className="text-[#131921]" />
            </div>
            <div>
              <h2 className="font-bold text-sm text-[#0F1111] group-hover:text-[#C7511F] mb-0.5">
                {title}
              </h2>
              <p className="text-xs text-gray-600">{desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Prime banner */}
      <div className="mt-8 bg-gradient-to-r from-[#232F3E] to-[#37475A] rounded p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-2xl font-bold italic text-[#00A8E1] mb-1">prime</div>
          <h2 className="text-lg font-bold mb-1">Join Prime for free delivery and exclusive deals</h2>
          <p className="text-gray-300 text-sm">30-day free trial. Cancel anytime.</p>
        </div>
        <Link
          href="#"
          className="bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 px-6 py-2 rounded-full font-bold text-sm transition-colors whitespace-nowrap"
        >
          Try Prime Free
        </Link>
      </div>
    </div>
  );
}
