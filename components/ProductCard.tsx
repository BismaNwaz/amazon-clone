"use client";

import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { Product } from "@/lib/data";
import { useCart } from "@/lib/cart-context";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
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

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="bg-white rounded border border-gray-200 hover:shadow-lg transition-shadow flex flex-col h-full group">
      <Link href={`/product/${product.id}`} className="block p-3 flex-shrink-0">
        {/* Badge */}
        {product.badge && (
          <div className="mb-2">
            <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${
              product.badge.includes("Best Seller")
                ? "bg-[#FF9900] text-white"
                : product.badge.includes("#1")
                ? "bg-[#c00] text-white"
                : "bg-[#007185] text-white"
            }`}>
              {product.badge}
            </span>
          </div>
        )}

        {/* Image */}
        <div className="relative w-full aspect-square mb-3 overflow-hidden rounded bg-gray-50">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        </div>

        {/* Title */}
        <h3 className="text-sm text-[#0F1111] line-clamp-2 leading-snug mb-1 hover:text-[#C7511F]">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-1">
          <StarRating rating={product.rating} />
          <span className="text-xs text-[#007185] hover:text-[#C7511F]">
            {product.reviewCount.toLocaleString()}
          </span>
        </div>

        {/* Price */}
        <div className="mb-1">
          <span className="text-xs align-top text-[#B12704] font-light">$</span>
          <span className="text-xl font-semibold text-[#B12704]">
            {Math.floor(product.price)}
          </span>
          <span className="text-xs align-top text-[#B12704]">
            {(product.price % 1).toFixed(2).slice(1)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-500 line-through ml-2">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Prime badge */}
        {product.prime && (
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-[#00A8E1] italic">prime</span>
            <span className="text-xs text-gray-600">FREE delivery</span>
          </div>
        )}
      </Link>

      {/* Add to cart */}
      <div className="p-3 pt-0 mt-auto">
        <button
          onClick={() => addItem(product)}
          className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-sm font-normal py-1.5 px-3 rounded-full border border-[#FCD200] transition-colors text-[#0F1111]"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
