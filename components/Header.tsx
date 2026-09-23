"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, ShoppingCart, MapPin, ChevronDown, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { categories } from "@/lib/data";

export default function Header() {
  const router = useRouter();
  const { totalItems } = useCart();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Main header bar */}
      <div className="bg-[#131921] text-white">
        <div className="max-w-screen-2xl mx-auto px-2 flex items-center gap-2 h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0 border border-transparent hover:border-white rounded px-1 py-1 mr-1">
            <span className="text-white font-bold text-xl leading-none">amazon</span>
            <span className="text-[#FF9900] font-bold text-xl">.clone</span>
          </Link>

          {/* Delivery location */}
          <Link href="/" className="hidden lg:flex items-center gap-1 border border-transparent hover:border-white rounded px-1 py-1 flex-shrink-0">
            <MapPin size={16} className="text-white mt-3" />
            <div>
              <div className="text-xs text-gray-300">Deliver to</div>
              <div className="text-sm font-bold text-white">United States</div>
            </div>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 flex h-10">
            <select
              className="bg-[#f3f3f3] text-gray-800 text-xs px-2 rounded-l-md border-r border-gray-300 hidden md:block w-28 flex-shrink-0 cursor-pointer"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option>All</option>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Amazon Clone..."
              className="flex-1 px-4 py-2 text-gray-900 text-sm outline-none"
            />
            <button
              type="submit"
              className="bg-[#FF9900] hover:bg-[#f08804] w-12 flex items-center justify-center rounded-r-md flex-shrink-0 transition-colors"
            >
              <Search size={20} className="text-gray-900" />
            </button>
          </form>

          {/* Account */}
          <Link href="/account" className="hidden md:flex flex-col border border-transparent hover:border-white rounded px-2 py-1 flex-shrink-0">
            <span className="text-xs text-gray-300">Hello, sign in</span>
            <span className="text-sm font-bold flex items-center gap-0.5">
              Account & Lists <ChevronDown size={14} />
            </span>
          </Link>

          {/* Returns */}
          <Link href="/orders" className="hidden md:flex flex-col border border-transparent hover:border-white rounded px-2 py-1 flex-shrink-0">
            <span className="text-xs text-gray-300">Returns</span>
            <span className="text-sm font-bold">& Orders</span>
          </Link>

          {/* Cart */}
          <Link href="/cart" className="flex items-end gap-1 border border-transparent hover:border-white rounded px-2 py-1 flex-shrink-0 relative">
            <div className="relative">
              <ShoppingCart size={34} className="text-white" />
              <span className="absolute -top-1 left-4 bg-[#FF9900] text-[#131921] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            </div>
            <span className="text-sm font-bold hidden md:block pb-1">Cart</span>
          </Link>

          {/* Mobile menu */}
          <button
            className="md:hidden border border-transparent hover:border-white rounded p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Secondary nav */}
      <div className="bg-[#232F3E] text-white">
        <div className="max-w-screen-2xl mx-auto px-2 flex items-center gap-1 h-10 overflow-x-auto scrollbar-hide">
          <Link href="/" className="flex items-center gap-1 px-2 py-1 text-sm whitespace-nowrap border border-transparent hover:border-white rounded flex-shrink-0">
            <Menu size={16} />
            All
          </Link>
          <Link href="/search?q=prime" className="px-2 py-1 text-sm whitespace-nowrap border border-transparent hover:border-white rounded flex-shrink-0">
            Prime
          </Link>
          {categories.slice(0, 6).map((cat) => (
            <Link
              key={cat}
              href={`/search?category=${encodeURIComponent(cat)}`}
              className="px-2 py-1 text-sm whitespace-nowrap border border-transparent hover:border-white rounded flex-shrink-0"
            >
              {cat}
            </Link>
          ))}
          <Link href="/search?q=deals" className="px-2 py-1 text-sm whitespace-nowrap border border-transparent hover:border-white rounded flex-shrink-0">
            Today&apos;s Deals
          </Link>
          <Link href="/search?q=gift" className="px-2 py-1 text-sm whitespace-nowrap border border-transparent hover:border-white rounded flex-shrink-0">
            Gift Cards
          </Link>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#131921] text-white border-t border-gray-600 p-4 space-y-2">
          <form onSubmit={handleSearch} className="flex mb-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="flex-1 px-3 py-2 text-gray-900 text-sm rounded-l"
            />
            <button type="submit" className="bg-[#FF9900] px-3 rounded-r">
              <Search size={16} className="text-gray-900" />
            </button>
          </form>
          <Link href="/account" className="block py-2 border-b border-gray-700 text-sm">Account & Lists</Link>
          <Link href="/orders" className="block py-2 border-b border-gray-700 text-sm">Returns & Orders</Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/search?category=${encodeURIComponent(cat)}`}
              className="block py-2 border-b border-gray-700 text-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              {cat}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
