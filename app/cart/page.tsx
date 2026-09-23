"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, ShieldCheck } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  const shipping = subtotal >= 35 || items.some((i) => i.product.prime) ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="bg-white rounded p-8 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-2xl font-bold mb-2">Your Amazon Clone Cart is empty</h1>
          <p className="text-gray-600 mb-6">
            Your Shopping Cart lives to serve. Give it purpose — fill it with groceries, clothing, household supplies, electronics, and more.
          </p>
          <Link
            href="/"
            className="inline-block bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 px-8 py-3 rounded-full font-semibold transition-colors"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-4">
        {/* Cart items */}
        <div className="bg-white rounded p-4 shadow-sm">
          <h1 className="text-2xl font-bold text-[#0F1111] mb-1">Shopping Cart</h1>
          <div className="text-sm text-gray-500 text-right mb-4 border-b border-gray-200 pb-3">
            Price
          </div>

          <div className="divide-y divide-gray-200">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="py-4 flex gap-4">
                {/* Image */}
                <Link href={`/product/${product.id}`} className="flex-shrink-0">
                  <div className="relative w-28 h-28 rounded overflow-hidden bg-gray-50">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </div>
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="text-sm font-medium text-[#0F1111] hover:text-[#C7511F] mb-1 line-clamp-2">
                      {product.title}
                    </h3>
                  </Link>

                  <div className="text-sm text-green-700 mb-1">In Stock</div>

                  {product.prime && (
                    <div className="text-xs mb-1">
                      <span className="font-bold text-[#00A8E1] italic">prime</span>
                      <span className="text-gray-600"> FREE delivery</span>
                    </div>
                  )}

                  <div className="flex items-center gap-3 mt-2">
                    {/* Quantity */}
                    <select
                      value={quantity}
                      onChange={(e) => updateQuantity(product.id, Number(e.target.value))}
                      className="border border-gray-300 rounded px-2 py-1 text-sm bg-gray-50"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((q) => (
                        <option key={q} value={q}>Qty: {q}</option>
                      ))}
                    </select>

                    <span className="text-gray-300">|</span>

                    <button
                      onClick={() => removeItem(product.id)}
                      className="text-sm text-[#007185] hover:text-[#C7511F] hover:underline flex items-center gap-1"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>

                    <span className="text-gray-300">|</span>

                    <button className="text-sm text-[#007185] hover:underline">
                      Save for later
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right flex-shrink-0">
                  <div className="font-bold text-[#B12704]">
                    ${(product.price * quantity).toFixed(2)}
                  </div>
                  {quantity > 1 && (
                    <div className="text-xs text-gray-500">
                      ${product.price.toFixed(2)} each
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-right pt-3 border-t border-gray-200">
            <span className="text-lg">
              Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items):{" "}
              <strong className="text-[#B12704]">${subtotal.toFixed(2)}</strong>
            </span>
          </div>
        </div>

        {/* Order summary */}
        <div>
          <div className="bg-white rounded p-4 shadow-sm sticky top-20">
            <div className="flex items-center gap-1 text-sm text-green-700 mb-3">
              <ShieldCheck size={16} />
              <span>Your order qualifies for FREE delivery</span>
            </div>

            <div className="text-lg mb-4">
              Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items):{" "}
              <strong className="text-[#B12704]">${subtotal.toFixed(2)}</strong>
            </div>

            <div className="text-sm text-gray-600 space-y-1 mb-4 border-b border-gray-200 pb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className={shipping === 0 ? "text-green-700" : ""}>
                  {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Order total</span>
              <span className="text-[#B12704]">${total.toFixed(2)}</span>
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-[#FFD814] hover:bg-[#F7CA00] text-center text-sm font-normal py-2 px-4 rounded-full border border-[#FCD200] transition-colors mb-2"
            >
              Proceed to checkout
            </Link>

            <div className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-1">
              <ShieldCheck size={12} />
              Secure checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
