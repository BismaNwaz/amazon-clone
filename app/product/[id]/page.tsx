"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Star, Shield, Truck, RefreshCw, Check, ChevronRight } from "lucide-react";
import { getProductById, products } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import ProductCard from "@/components/ProductCard";

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={
            star <= Math.floor(rating)
              ? "text-[#FF9900] fill-[#FF9900]"
              : star <= rating
              ? "text-[#FF9900] fill-[#FF9900] opacity-50"
              : "text-gray-300 fill-gray-300"
          }
        />
      ))}
    </div>
  );
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = getProductById(id);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) notFound();

  const similar = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-4">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-[#007185] mb-4 flex-wrap">
        <Link href="/" className="hover:underline">Home</Link>
        <ChevronRight size={14} className="text-gray-400" />
        <Link href={`/search?category=${encodeURIComponent(product.category)}`} className="hover:underline">{product.category}</Link>
        <ChevronRight size={14} className="text-gray-400" />
        <span className="text-gray-600 line-clamp-1">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-[40%_1fr_280px] gap-6">
        {/* Image panel */}
        <div className="bg-white rounded p-4">
          <div className="relative w-full aspect-square rounded overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
          </div>
          {product.badge && (
            <div className="mt-3 flex gap-2">
              <span className={`text-xs font-bold px-2 py-1 rounded ${
                product.badge.includes("Best Seller") ? "bg-[#FF9900] text-white" :
                product.badge.includes("#1") ? "bg-[#c00] text-white" :
                "bg-[#007185] text-white"
              }`}>
                {product.badge}
              </span>
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="bg-white rounded p-4">
          <h1 className="text-xl font-medium text-[#0F1111] mb-2">{product.title}</h1>

          {/* Brand */}
          <div className="text-sm text-[#007185] mb-2">
            Brand: <Link href="#" className="hover:underline">{product.brand}</Link>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3 border-b border-gray-200 pb-3">
            <StarRating rating={product.rating} size={18} />
            <Link href="#reviews" className="text-sm text-[#007185] hover:underline">
              {product.reviewCount.toLocaleString()} ratings
            </Link>
          </div>

          {/* Price */}
          <div className="mb-4">
            {discount && (
              <span className="text-sm text-[#CC0C39] font-bold mr-2">-{discount}%</span>
            )}
            <span className="text-sm align-top text-[#0F1111] font-light mt-1 inline-block">$</span>
            <span className="text-3xl font-normal text-[#0F1111]">
              {Math.floor(product.price)}
            </span>
            <span className="text-sm align-top text-[#0F1111] mt-1 inline-block">
              {(product.price % 1).toFixed(2).slice(1)}
            </span>
            {product.originalPrice && (
              <div className="text-sm text-gray-500 mt-1">
                List Price: <span className="line-through">${product.originalPrice.toFixed(2)}</span>
              </div>
            )}
          </div>

          {/* Prime */}
          {product.prime && (
            <div className="flex items-center gap-2 mb-4 text-sm">
              <span className="font-bold text-[#00A8E1] italic text-base">prime</span>
              <span>FREE delivery</span>
              <span className="text-[#007185]">Tomorrow</span>
            </div>
          )}

          {/* Description */}
          <div className="mb-4">
            <h2 className="font-bold text-[#0F1111] mb-2">About this item</h2>
            <ul className="space-y-1">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#0F1111]">
                  <span className="text-gray-500 mt-0.5">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Full description */}
          <div className="mb-4">
            <h2 className="font-bold text-[#0F1111] mb-2">Product Description</h2>
            <p className="text-sm text-[#0F1111]">{product.description}</p>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield size={16} className="text-green-600" />
              <span>Secure transaction</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Truck size={16} className="text-[#007185]" />
              <span>Fast delivery</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <RefreshCw size={16} className="text-[#007185]" />
              <span>Free returns</span>
            </div>
          </div>
        </div>

        {/* Buy box */}
        <div>
          <div className="bg-white rounded border border-gray-200 p-4 sticky top-20">
            {/* Price */}
            <div className="mb-2">
              <span className="text-sm align-top">$</span>
              <span className="text-2xl font-normal">{Math.floor(product.price)}</span>
              <span className="text-sm align-top">{(product.price % 1).toFixed(2).slice(1)}</span>
            </div>

            {/* Prime delivery */}
            {product.prime && (
              <div className="text-sm mb-2">
                <span className="font-bold text-[#00A8E1] italic">prime</span>
                <span className="text-gray-700"> FREE delivery </span>
                <span className="font-bold">Tomorrow</span>
              </div>
            )}

            {/* Deliver to */}
            <div className="flex items-center gap-1 text-sm text-gray-700 mb-3">
              <span>Deliver to</span>
              <Link href="#" className="text-[#007185] font-bold hover:underline">United States</Link>
            </div>

            {/* In stock */}
            <div className="text-green-700 font-semibold mb-3">
              {product.inStock ? "In Stock" : "Out of Stock"}
            </div>

            {/* Quantity */}
            <div className="mb-3">
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1 text-sm bg-gray-50 w-full"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((q) => (
                  <option key={q} value={q}>Qty: {q}</option>
                ))}
              </select>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-sm font-normal py-2 px-4 rounded-full border border-[#FCD200] transition-colors mb-2 flex items-center justify-center gap-2"
            >
              {added ? (
                <>
                  <Check size={16} className="text-green-700" />
                  <span>Added to cart</span>
                </>
              ) : (
                "Add to Cart"
              )}
            </button>

            {/* Buy now */}
            <Link
              href="/checkout"
              onClick={() => addItem(product, quantity)}
              className="w-full bg-[#FF9900] hover:bg-[#F7CA00] text-sm font-normal py-2 px-4 rounded-full border border-[#FCD200] transition-colors mb-4 flex items-center justify-center"
            >
              Buy Now
            </Link>

            {/* Sold by */}
            <div className="text-sm text-gray-600 space-y-1">
              <div>Sold by: <Link href="#" className="text-[#007185] hover:underline">{product.brand}</Link></div>
              <div>Ships from: <span className="font-medium">Amazon</span></div>
            </div>

            {/* Trust */}
            <div className="mt-3 pt-3 border-t border-gray-200 flex items-center gap-2 text-sm text-gray-600">
              <Shield size={14} className="text-green-600" />
              <span>Secure transaction</span>
            </div>
          </div>
        </div>
      </div>

      {/* Similar products */}
      {similar.length > 0 && (
        <section className="mt-8">
          <div className="bg-white rounded p-4">
            <h2 className="text-xl font-bold mb-4">Similar items you might like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {similar.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
