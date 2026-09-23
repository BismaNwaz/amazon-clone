"use client";

import Link from "next/link";
import Image from "next/image";
import { Package, ChevronRight } from "lucide-react";
import { products } from "@/lib/data";

// Sample order history with real product data
const sampleOrders = [
  {
    id: "114-9823741-2938471",
    date: "September 18, 2026",
    total: 279.99,
    status: "Delivered",
    deliveredDate: "September 21, 2026",
    items: [products[0]],
  },
  {
    id: "114-1234567-8901234",
    date: "September 10, 2026",
    total: 109.98,
    status: "Delivered",
    deliveredDate: "September 13, 2026",
    items: [products[4], products[10]],
  },
  {
    id: "114-5678901-2345678",
    date: "August 28, 2026",
    total: 49.99,
    status: "Delivered",
    deliveredDate: "September 1, 2026",
    items: [products[7]],
  },
];

export default function OrdersPage() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-[#0F1111] mb-2">Your Orders</h1>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["Orders", "Buy Again", "Not Yet Shipped", "Cancelled Orders", "Local Store Orders"].map((tab, i) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-full text-sm border transition-colors ${
              i === 0
                ? "bg-white border-[#007185] text-[#007185] font-semibold shadow-sm"
                : "border-gray-300 text-gray-700 hover:border-[#007185] hover:text-[#007185] bg-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Orders list */}
      <div className="space-y-4">
        {sampleOrders.map((order) => (
          <div key={order.id} className="bg-white rounded border border-gray-200 shadow-sm overflow-hidden">
            {/* Order header */}
            <div className="bg-gray-50 border-b border-gray-200 p-4">
              <div className="flex flex-wrap gap-4 text-sm">
                <div>
                  <div className="text-xs text-gray-500 uppercase font-medium">Order placed</div>
                  <div className="text-[#0F1111]">{order.date}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase font-medium">Total</div>
                  <div className="text-[#0F1111]">${order.total.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase font-medium">Ship to</div>
                  <div className="text-[#007185] hover:underline cursor-pointer">John Smith ▾</div>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-xs text-gray-500 uppercase font-medium">Order # {order.id}</div>
                  <div className="flex gap-2 mt-1">
                    <button className="text-xs text-[#007185] hover:underline">View order details</button>
                    <span className="text-gray-300">|</span>
                    <button className="text-xs text-[#007185] hover:underline">Invoice</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Order items */}
            <div className="p-4">
              <div className="flex items-start gap-2 mb-3">
                <Package size={16} className="text-green-600 mt-0.5" />
                <div>
                  <span className="font-bold text-green-700">Delivered {order.deliveredDate}</span>
                  <span className="text-sm text-gray-600 ml-2">|</span>
                  <button className="text-sm text-[#007185] hover:underline ml-2">Track package</button>
                </div>
              </div>

              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 mb-3">
                  <Link href={`/product/${item.id}`} className="flex-shrink-0">
                    <div className="relative w-20 h-20 rounded overflow-hidden bg-gray-50 border border-gray-200">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                  </Link>
                  <div className="flex-1">
                    <Link href={`/product/${item.id}`}>
                      <h3 className="text-sm text-[#007185] hover:underline hover:text-[#C7511F] line-clamp-2">
                        {item.title}
                      </h3>
                    </Link>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      <button className="text-xs border border-gray-300 rounded px-3 py-1 hover:bg-gray-50 transition-colors">
                        Buy it again
                      </button>
                      <button className="text-xs border border-gray-300 rounded px-3 py-1 hover:bg-gray-50 transition-colors">
                        Write a product review
                      </button>
                      <Link
                        href={`/product/${item.id}`}
                        className="text-xs border border-gray-300 rounded px-3 py-1 hover:bg-gray-50 transition-colors"
                      >
                        View product
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Empty state if no orders */}
      <div className="mt-6 bg-white rounded border border-gray-200 p-8 text-center">
        <h2 className="text-lg font-bold mb-2">Looking for an order?</h2>
        <p className="text-sm text-gray-600 mb-4">
          We can usually find your order in your account within 24 hours of ordering.
        </p>
        <Link href="/" className="text-[#007185] hover:underline text-sm">
          Start shopping →
        </Link>
      </div>
    </div>
  );
}
