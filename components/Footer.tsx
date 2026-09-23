"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#232F3E] text-white mt-8">
      {/* Back to top */}
      <div
        className="bg-[#37475A] text-center py-3 text-sm hover:bg-[#485769] cursor-pointer transition-colors"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Back to top
      </div>

      {/* Links grid */}
      <div className="max-w-screen-xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-white mb-3">Get to Know Us</h3>
          <ul className="space-y-2">
            {["Careers", "Blog", "About Amazon", "Investor Relations", "Amazon Devices", "Amazon Science"].map((item) => (
              <li key={item}>
                <Link href="#" className="text-sm text-gray-300 hover:text-white hover:underline">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-white mb-3">Make Money with Us</h3>
          <ul className="space-y-2">
            {["Sell on Amazon", "Sell under Amazon Accelerator", "Protect & Build Your Brand", "Amazon Associates", "Become an Affiliate", "Advertise Your Products"].map((item) => (
              <li key={item}>
                <Link href="#" className="text-sm text-gray-300 hover:text-white hover:underline">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-white mb-3">Amazon Payment Products</h3>
          <ul className="space-y-2">
            {["Amazon Business Card", "Shop with Points", "Reload Your Balance", "Amazon Currency Converter", "Amazon and COVID-19"].map((item) => (
              <li key={item}>
                <Link href="#" className="text-sm text-gray-300 hover:text-white hover:underline">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-white mb-3">Let Us Help You</h3>
          <ul className="space-y-2">
            {["Your Account", "Your Orders", "Shipping Rates & Policies", "Returns & Replacements", "Manage Content & Devices", "Customer Service"].map((item) => (
              <li key={item}>
                <Link href="#" className="text-sm text-gray-300 hover:text-white hover:underline">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-600" />

      {/* Bottom */}
      <div className="py-6 text-center space-y-3">
        <div className="text-white text-2xl font-bold">
          amazon<span className="text-[#FF9900]">.clone</span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400">
          {["Conditions of Use", "Privacy Notice", "Your Ads Privacy Choices", "Consumer Health Data Privacy Disclosure", "Interest-Based Ads"].map((item) => (
            <Link key={item} href="#" className="hover:underline">
              {item}
            </Link>
          ))}
        </div>
        <p className="text-xs text-gray-400">
          © 2024-2026, Amazon Clone — Built with Next.js + Tailwind for 8x Engineering Assignment
        </p>
      </div>
    </footer>
  );
}
