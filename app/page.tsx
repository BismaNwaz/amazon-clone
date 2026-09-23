"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products, heroSlides, categories } from "@/lib/data";

const categoryIcons: Record<string, string> = {
  "Electronics": "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop",
  "Clothing": "https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&h=200&fit=crop",
  "Books": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=200&fit=crop",
  "Home & Kitchen": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop",
  "Sports": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200&h=200&fit=crop",
  "Toys": "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=200&h=200&fit=crop",
  "Beauty": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop",
  "Computers": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=200&fit=crop",
};

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const featuredProducts = products.filter((p) => p.badge);
  const electronicsProducts = products.filter((p) => p.category === "Electronics");
  const kitchenProducts = products.filter((p) => p.category === "Home & Kitchen");
  const bestSellers = products.slice().sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 4);

  return (
    <div>
      {/* Hero carousel */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#a1b5c3] to-[#EAEDED]">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {heroSlides.map((slide) => (
            <div key={slide.id} className="min-w-full relative h-64 md:h-96">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex items-center">
                <div className="text-white px-8 md:px-16">
                  <h2 className="text-2xl md:text-4xl font-bold mb-2">{slide.title}</h2>
                  <p className="text-lg md:text-xl opacity-90 mb-4">{slide.subtitle}</p>
                  <Link
                    href="/search?q=all"
                    className="inline-block bg-white text-gray-900 px-6 py-2 rounded font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Shop now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel controls */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-screen-2xl mx-auto px-3 py-4 -mt-8 relative z-10">

        {/* Category grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {categories.slice(0, 4).map((cat) => (
            <Link
              key={cat}
              href={`/search?category=${encodeURIComponent(cat)}`}
              className="bg-white rounded p-4 shadow-sm hover:shadow-md transition-shadow group"
            >
              <h3 className="font-bold text-[#0F1111] mb-3 group-hover:text-[#C7511F]">{cat}</h3>
              <div className="relative w-full aspect-square rounded overflow-hidden">
                <Image
                  src={categoryIcons[cat] || "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=200&h=200&fit=crop"}
                  alt={cat}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>
              <span className="text-sm text-[#007185] mt-2 block group-hover:underline">Shop now</span>
            </Link>
          ))}
        </div>

        {/* Best Sellers */}
        <section className="mb-6">
          <div className="bg-white rounded p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#0F1111]">Best Sellers</h2>
              <Link href="/search?q=best+sellers" className="text-sm text-[#007185] hover:text-[#C7511F] hover:underline">
                See all deals →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Second category row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {categories.slice(4, 8).map((cat) => (
            <Link
              key={cat}
              href={`/search?category=${encodeURIComponent(cat)}`}
              className="bg-white rounded p-4 shadow-sm hover:shadow-md transition-shadow group"
            >
              <h3 className="font-bold text-[#0F1111] mb-3 group-hover:text-[#C7511F]">{cat}</h3>
              <div className="relative w-full aspect-square rounded overflow-hidden">
                <Image
                  src={categoryIcons[cat] || "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=200&h=200&fit=crop"}
                  alt={cat}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>
              <span className="text-sm text-[#007185] mt-2 block group-hover:underline">Shop now</span>
            </Link>
          ))}
        </div>

        {/* Electronics */}
        <section className="mb-6">
          <div className="bg-white rounded p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#0F1111]">Plug in with our electronics</h2>
              <Link href="/search?category=Electronics" className="text-sm text-[#007185] hover:text-[#C7511F] hover:underline">
                See all →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {electronicsProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Today's Deals Banner */}
        <section className="mb-6">
          <div className="bg-gradient-to-r from-[#232F3E] to-[#37475A] rounded p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-[#FF9900] font-bold text-sm uppercase tracking-wide mb-1">Limited time deals</div>
              <h2 className="text-2xl font-bold mb-2">Today&apos;s Deals</h2>
              <p className="text-gray-300 mb-4">Up to 60% off on top products</p>
              <Link
                href="/search?q=deals"
                className="inline-block bg-[#FF9900] hover:bg-[#f08804] text-white px-6 py-2 rounded font-semibold transition-colors"
              >
                See all deals
              </Link>
            </div>
            <div className="flex gap-3 flex-wrap justify-center">
              {products.filter(p => p.originalPrice).slice(0, 3).map((p) => (
                <Link key={p.id} href={`/product/${p.id}`} className="bg-white/10 hover:bg-white/20 rounded-lg p-3 text-center transition-colors w-32">
                  <div className="relative w-20 h-20 mx-auto mb-2">
                    <Image src={p.image} alt={p.title} fill className="object-cover rounded" sizes="80px" />
                  </div>
                  <div className="text-xs text-[#FF9900] font-bold">
                    {Math.round(((p.originalPrice! - p.price) / p.originalPrice!) * 100)}% off
                  </div>
                  <div className="text-sm font-bold">${p.price}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Home & Kitchen */}
        <section className="mb-6">
          <div className="bg-white rounded p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#0F1111]">Home & Kitchen essentials</h2>
              <Link href="/search?category=Home+%26+Kitchen" className="text-sm text-[#007185] hover:text-[#C7511F] hover:underline">
                See all →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {kitchenProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* All products */}
        <section className="mb-6">
          <div className="bg-white rounded p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#0F1111]">More to explore</h2>
              <Link href="/search?q=all" className="text-sm text-[#007185] hover:text-[#C7511F] hover:underline">
                See all →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Prime banner */}
        <section className="mb-6">
          <div className="bg-[#00A8E1] rounded p-6 text-white text-center">
            <h2 className="text-2xl font-bold mb-2">Try Prime free for 30 days</h2>
            <p className="mb-4 opacity-90">FREE fast delivery, exclusive deals, streaming and more</p>
            <Link
              href="/account"
              className="inline-block bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 px-8 py-3 rounded-full font-bold transition-colors"
            >
              Start your free trial
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
