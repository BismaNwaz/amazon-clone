"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ShieldCheck, Lock, Check } from "lucide-react";
import { useCart } from "@/lib/cart-context";

type Step = "address" | "payment" | "review" | "confirmed";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<Step>("address");

  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
  });

  const [payment, setPayment] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    nameOnCard: "",
  });

  const shipping = subtotal >= 35 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const steps: Step[] = ["address", "payment", "review", "confirmed"];
  const stepLabels: Record<Step, string> = {
    address: "Shipping Address",
    payment: "Payment",
    review: "Review Order",
    confirmed: "Order Confirmed",
  };

  if (items.length === 0 && step !== "confirmed") {
    return (
      <div className="max-w-screen-md mx-auto px-4 py-8 text-center">
        <div className="bg-white rounded p-8">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Link href="/" className="text-[#007185] hover:underline">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  if (step === "confirmed") {
    return (
      <div className="max-w-screen-md mx-auto px-4 py-8">
        <div className="bg-white rounded p-8 text-center shadow-sm">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-green-700 mb-2">Order Placed!</h1>
          <p className="text-gray-600 mb-2">
            Thank you, {address.fullName || "Customer"}! Your order has been placed.
          </p>
          <div className="bg-gray-50 rounded p-4 my-6 text-left">
            <div className="text-sm text-gray-600 space-y-2">
              <div className="flex justify-between">
                <span>Order #</span>
                <span className="font-mono font-bold">
                  {Math.random().toString(36).substr(2, 10).toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated delivery</span>
                <span className="font-bold text-green-700">
                  {new Date(Date.now() + 86400000 * 3).toLocaleDateString("en-US", {
                    weekday: "long", month: "long", day: "numeric"
                  })}
                </span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total charged</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            A confirmation email has been sent to your address.
          </p>
          <Link
            href="/"
            className="inline-block bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 px-8 py-3 rounded-full font-semibold transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/" className="text-2xl font-bold">
          amazon<span className="text-[#FF9900]">.clone</span>
        </Link>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Lock size={14} />
          Secure checkout
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {(["address", "payment", "review"] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`flex items-center gap-2 text-sm ${
                step === s ? "font-bold text-[#C7511F]" :
                steps.indexOf(step) > steps.indexOf(s) ? "text-gray-600" :
                "text-gray-400"
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                steps.indexOf(step) > steps.indexOf(s)
                  ? "bg-green-600 text-white"
                  : step === s
                  ? "bg-[#C7511F] text-white"
                  : "bg-gray-200 text-gray-500"
              }`}>
                {steps.indexOf(step) > steps.indexOf(s) ? "✓" : i + 1}
              </div>
              {stepLabels[s]}
            </div>
            {i < 2 && <ChevronRight size={14} className="text-gray-400" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-4">
        {/* Form */}
        <div className="bg-white rounded p-6 shadow-sm">

          {/* Step 1: Address */}
          {step === "address" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Enter a shipping address</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full name</label>
                  <input
                    type="text"
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#007185] focus:ring-1 focus:ring-[#007185]"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Street address</label>
                  <input
                    type="text"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#007185] focus:ring-1 focus:ring-[#007185]"
                    placeholder="123 Main St"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#007185]"
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">State</label>
                    <input
                      type="text"
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#007185]"
                      placeholder="NY"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">ZIP code</label>
                    <input
                      type="text"
                      value={address.zip}
                      onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#007185]"
                      placeholder="10001"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Country</label>
                    <select
                      value={address.country}
                      onChange={(e) => setAddress({ ...address, country: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#007185]"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Germany</option>
                      <option>Pakistan</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => setStep("payment")}
                  className="w-full bg-[#FFD814] hover:bg-[#F7CA00] py-2 px-4 rounded-full font-normal text-sm border border-[#FCD200] transition-colors mt-2"
                >
                  Continue to payment
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === "payment" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Payment method</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-2 p-3 border border-[#007185] rounded bg-[#EAF4FE]">
                  <input type="radio" defaultChecked id="card" className="accent-[#007185]" />
                  <label htmlFor="card" className="text-sm font-medium">Credit or debit card</label>
                  <div className="ml-auto flex gap-1">
                    {["VISA", "MC", "AMEX"].map((c) => (
                      <span key={c} className="text-xs border border-gray-300 rounded px-1 py-0.5 bg-white font-mono font-bold text-gray-600">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Card number</label>
                  <input
                    type="text"
                    value={payment.cardNumber}
                    onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:border-[#007185]"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Expiry date</label>
                    <input
                      type="text"
                      value={payment.expiry}
                      onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:border-[#007185]"
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">CVV</label>
                    <input
                      type="text"
                      value={payment.cvv}
                      onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:border-[#007185]"
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Name on card</label>
                  <input
                    type="text"
                    value={payment.nameOnCard}
                    onChange={(e) => setPayment({ ...payment, nameOnCard: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#007185]"
                    placeholder="John Smith"
                  />
                </div>

                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <ShieldCheck size={12} className="text-green-600" />
                  Your card details are encrypted and secure
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep("address")}
                    className="flex-1 border border-gray-300 py-2 px-4 rounded-full text-sm hover:bg-gray-50 transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setStep("review")}
                    className="flex-1 bg-[#FFD814] hover:bg-[#F7CA00] py-2 px-4 rounded-full font-normal text-sm border border-[#FCD200] transition-colors"
                  >
                    Review order
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === "review" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Review your order</h2>

              {/* Shipping summary */}
              <div className="border border-gray-200 rounded p-3 mb-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-sm">Shipping address</h3>
                  <button onClick={() => setStep("address")} className="text-xs text-[#007185] hover:underline">Change</button>
                </div>
                <p className="text-sm text-gray-600">
                  {address.fullName}<br />
                  {address.street}<br />
                  {address.city}, {address.state} {address.zip}<br />
                  {address.country}
                </p>
              </div>

              {/* Payment summary */}
              <div className="border border-gray-200 rounded p-3 mb-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-sm">Payment</h3>
                  <button onClick={() => setStep("payment")} className="text-xs text-[#007185] hover:underline">Change</button>
                </div>
                <p className="text-sm text-gray-600">
                  Card ending in {payment.cardNumber.slice(-4) || "****"}
                </p>
              </div>

              {/* Items */}
              <div className="border border-gray-200 rounded p-3 mb-4">
                <h3 className="font-bold text-sm mb-3">Items ({items.reduce((s, i) => s + i.quantity, 0)})</h3>
                <div className="space-y-3">
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="flex gap-3">
                      <div className="relative w-12 h-12 flex-shrink-0 rounded overflow-hidden">
                        <Image src={product.image} alt={product.title} fill className="object-cover" sizes="48px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-[#0F1111] line-clamp-2">{product.title}</p>
                        <p className="text-xs text-gray-500">Qty: {quantity}</p>
                      </div>
                      <div className="text-sm font-medium text-[#B12704]">
                        ${(product.price * quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep("payment")}
                  className="flex-1 border border-gray-300 py-2 px-4 rounded-full text-sm hover:bg-gray-50 transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={() => {
                    clearCart();
                    setStep("confirmed");
                  }}
                  className="flex-2 bg-[#FFD814] hover:bg-[#F7CA00] py-2 px-6 rounded-full font-normal text-sm border border-[#FCD200] transition-colors"
                >
                  Place your order — ${total.toFixed(2)}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order summary sidebar */}
        <div>
          <div className="bg-white rounded p-4 shadow-sm sticky top-20">
            <h2 className="font-bold text-lg mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Items ({items.reduce((s, i) => s + i.quantity, 0)})</span>
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
            <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between font-bold text-[#B12704]">
              <span>Order total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {step === "review" && (
              <button
                onClick={() => {
                  clearCart();
                  setStep("confirmed");
                }}
                className="mt-4 w-full bg-[#FF9900] hover:bg-[#f08804] py-2 px-4 rounded-full text-sm font-semibold text-white transition-colors"
              >
                Place order
              </button>
            )}

            <div className="mt-4 flex items-center gap-1 text-xs text-gray-500">
              <ShieldCheck size={12} className="text-green-600" />
              Secure, encrypted payment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
