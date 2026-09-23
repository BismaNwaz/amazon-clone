"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useMemo } from "react";
import Link from "next/link";
import { ChevronRight, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/lib/data";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category") || "";

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [primeOnly, setPrimeOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];

    if (categoryParam) {
      result = result.filter((p) => p.category === categoryParam);
    }

    if (query && query !== "all" && query !== "deals" && query !== "best+sellers") {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }

    if (primeOnly) {
      result = result.filter((p) => p.prime);
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "reviews":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        break;
    }

    return result;
  }, [query, categoryParam, priceRange, selectedBrands, minRating, primeOnly, sortBy]);

  const allBrands = Array.from(new Set(products.map((p) => p.brand)));

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const title = categoryParam
    ? `${categoryParam} (${filtered.length} results)`
    : query
    ? `Results for "${query}" (${filtered.length})`
    : `All Products (${filtered.length})`;

  return (
    <div className="max-w-screen-2xl mx-auto px-3 py-4">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-[#007185] mb-3">
        <Link href="/" className="hover:underline">Home</Link>
        <ChevronRight size={14} className="text-gray-400" />
        <span className="text-gray-600">{categoryParam || "Search Results"}</span>
      </nav>

      <div className="flex gap-4">
        {/* Sidebar filters */}
        <aside className={`${filtersOpen ? "block" : "hidden"} md:block w-64 flex-shrink-0`}>
          <div className="bg-white rounded p-4 shadow-sm sticky top-20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-[#0F1111]">Filters</h2>
              <button className="md:hidden" onClick={() => setFiltersOpen(false)}>
                <X size={16} />
              </button>
            </div>

            {/* Department */}
            <div className="mb-4 border-b border-gray-200 pb-4">
              <h3 className="font-bold text-sm text-[#0F1111] mb-2">Department</h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/search?q=all"
                    className="text-sm text-[#007185] hover:underline"
                  >
                    All Departments
                  </Link>
                </li>
                {categories.map((cat) => (
                  <li key={cat}>
                    <Link
                      href={`/search?category=${encodeURIComponent(cat)}`}
                      className={`text-sm hover:underline ${
                        categoryParam === cat
                          ? "text-[#C7511F] font-bold"
                          : "text-[#007185]"
                      }`}
                    >
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prime */}
            <div className="mb-4 border-b border-gray-200 pb-4">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={primeOnly}
                  onChange={(e) => setPrimeOnly(e.target.checked)}
                  className="rounded"
                />
                <span className="font-bold text-[#00A8E1] italic">prime</span>
                <span>Eligible</span>
              </label>
            </div>

            {/* Price range */}
            <div className="mb-4 border-b border-gray-200 pb-4">
              <h3 className="font-bold text-sm text-[#0F1111] mb-2">Price</h3>
              <div className="space-y-1">
                {[
                  [0, 25, "Under $25"],
                  [25, 50, "$25 to $50"],
                  [50, 100, "$50 to $100"],
                  [100, 200, "$100 to $200"],
                  [200, 3000, "$200 & above"],
                ].map(([min, max, label]) => (
                  <button
                    key={label as string}
                    onClick={() => setPriceRange([min as number, max as number])}
                    className={`block text-sm text-left w-full hover:underline ${
                      priceRange[0] === min && priceRange[1] === max
                        ? "text-[#C7511F] font-bold"
                        : "text-[#007185]"
                    }`}
                  >
                    {label as string}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="mb-4 border-b border-gray-200 pb-4">
              <h3 className="font-bold text-sm text-[#0F1111] mb-2">Avg. Customer Review</h3>
              {[4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setMinRating(minRating === rating ? 0 : rating)}
                  className={`flex items-center gap-1 text-sm mb-1 hover:underline ${
                    minRating === rating ? "text-[#C7511F] font-bold" : "text-[#007185]"
                  }`}
                >
                  {"★".repeat(rating)}{"☆".repeat(5 - rating)} & up
                </button>
              ))}
            </div>

            {/* Brands */}
            <div className="mb-4">
              <h3 className="font-bold text-sm text-[#0F1111] mb-2">Brand</h3>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {allBrands.map((brand) => (
                  <label key={brand} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="rounded"
                    />
                    <span className="text-[#007185] hover:underline">{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0">
          {/* Header bar */}
          <div className="bg-white rounded p-3 shadow-sm mb-4 flex items-center justify-between gap-3 flex-wrap">
            <div>
              <h1 className="text-sm text-gray-600">{title}</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="md:hidden flex items-center gap-1 text-sm border border-gray-300 rounded px-3 py-1"
                onClick={() => setFiltersOpen(true)}
              >
                <SlidersHorizontal size={14} />
                Filters
              </button>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border border-gray-300 rounded px-2 py-1 bg-white"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Avg. Customer Review</option>
                  <option value="reviews">Most Reviewed</option>
                </select>
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="bg-white rounded p-8 text-center">
              <h2 className="text-xl font-bold mb-2">No results found</h2>
              <p className="text-gray-600 mb-4">Try different keywords or adjust your filters</p>
              <Link href="/search?q=all" className="text-[#007185] hover:underline">
                Browse all products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <SearchResults />
    </Suspense>
  );
}
