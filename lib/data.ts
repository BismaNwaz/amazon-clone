export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  brand: string;
  prime: boolean;
  badge?: string;
  description: string;
  features: string[];
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export const categories = [
  "Electronics",
  "Clothing",
  "Books",
  "Home & Kitchen",
  "Sports",
  "Toys",
  "Beauty",
  "Computers",
];

export const products: Product[] = [
  {
    id: "1",
    title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
    price: 279.99,
    originalPrice: 399.99,
    rating: 4.7,
    reviewCount: 18432,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "Electronics",
    brand: "Sony",
    prime: true,
    badge: "Best Seller",
    description: "Industry-leading noise canceling with Dual Noise Sensor technology. Next-level music with newly developed integrated Processor V1.",
    features: [
      "Industry-leading noise canceling with Dual Noise Sensor technology",
      "30-hour battery life with quick charging",
      "Speak-to-Chat technology",
      "Multipoint connection - connect to two Bluetooth devices simultaneously",
      "Wear detection pauses music when headphones removed",
    ],
    inStock: true,
  },
  {
    id: "2",
    title: "Apple AirPods Pro (2nd Generation) with MagSafe Case",
    price: 189.99,
    originalPrice: 249.00,
    rating: 4.8,
    reviewCount: 52891,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop",
    category: "Electronics",
    brand: "Apple",
    prime: true,
    badge: "Amazon's Choice",
    description: "AirPods Pro deliver up to 2x more Active Noise Cancellation than the previous generation, and Adaptive Transparency.",
    features: [
      "Active Noise Cancellation and Transparency mode",
      "Adaptive Audio seamlessly blends Active Noise Cancellation and Transparency",
      "Personalized Spatial Audio with dynamic head tracking",
      "Up to 6 hours of listening time with Active Noise Cancellation enabled",
      "H2 chip",
    ],
    inStock: true,
  },
  {
    id: "3",
    title: "Samsung 65-inch QLED 4K Smart TV (QN65Q80D)",
    price: 1097.99,
    originalPrice: 1499.99,
    rating: 4.5,
    reviewCount: 7823,
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=400&fit=crop",
    category: "Electronics",
    brand: "Samsung",
    prime: true,
    description: "Quantum HDR 12X and Quantum Processor 4K with AI upscaling technology. Neo Quantum Processor 4K.",
    features: [
      "Quantum HDR 12X",
      "4K AI Upscaling",
      "Motion Xcelerator Turbo+",
      "Real Game Enhancer+",
      "SmartThings compatible",
    ],
    inStock: true,
  },
  {
    id: "4",
    title: "Kindle Paperwhite (16 GB) – Now with a 6.8-inch display",
    price: 139.99,
    originalPrice: 149.99,
    rating: 4.7,
    reviewCount: 34012,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop",
    category: "Electronics",
    brand: "Amazon",
    prime: true,
    badge: "Best Seller",
    description: "The thinnest, lightest Kindle Paperwhite ever—with a flush-front design and 300 ppi glare-free display.",
    features: [
      "6.8-inch display with adjustable warm light",
      "300 ppi glare-free display",
      "Up to 10 weeks of battery life",
      "IPX8 waterproof",
      "USB-C charging",
    ],
    inStock: true,
  },
  {
    id: "5",
    title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker, 6 Quart",
    price: 59.99,
    originalPrice: 99.95,
    rating: 4.7,
    reviewCount: 138592,
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=400&fit=crop",
    category: "Home & Kitchen",
    brand: "Instant Pot",
    prime: true,
    badge: "Best Seller",
    description: "7-in-1 multi-use programmable cooker: pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker & warmer.",
    features: [
      "7-in-1 functionality",
      "14 one-touch Smart Programs",
      "Cook up to 70% faster than traditional methods",
      "UL & ULC certified",
      "Easy clean stainless steel interior",
    ],
    inStock: true,
  },
  {
    id: "6",
    title: "Ninja AF101 Air Fryer that Cooks, Crisps and Dehydrates",
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.8,
    reviewCount: 89234,
    image: "https://images.unsplash.com/photo-1648803916598-9e0e9c71e85c?w=400&h=400&fit=crop",
    category: "Home & Kitchen",
    brand: "Ninja",
    prime: true,
    badge: "Amazon's Choice",
    description: "4-quart capacity that can fit 2 lbs of french fries. Up to 75% less fat than traditional frying methods.",
    features: [
      "4 quart capacity",
      "Up to 75% less fat than traditional frying",
      "4 versatile cooking programs",
      "1550 watts",
      "Wide temperature range: 105°F–400°F",
    ],
    inStock: true,
  },
  {
    id: "7",
    title: "Levi's Men's 511 Slim Fit Jeans",
    price: 39.99,
    originalPrice: 69.50,
    rating: 4.5,
    reviewCount: 45123,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
    category: "Clothing",
    brand: "Levi's",
    prime: true,
    description: "Slim through the thigh and leg opening. Sits below the waist. Made with our most comfortable stretch technology.",
    features: [
      "Slim fit through thigh and leg",
      "Sits below the waist",
      "Stretch fabric for comfort",
      "Machine washable",
      "Multiple color options",
    ],
    inStock: true,
  },
  {
    id: "8",
    title: "LEGO Icons Botanical Collection Orchid 10311",
    price: 49.99,
    originalPrice: 59.99,
    rating: 4.9,
    reviewCount: 12034,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    category: "Toys",
    brand: "LEGO",
    prime: true,
    badge: "Best Seller",
    description: "Build a beautiful LEGO flower arrangement with this set of 608 pieces depicting an orchid plant.",
    features: [
      "608 pieces",
      "For ages 18+",
      "Realistic-looking orchid",
      "Great home decoration",
      "Stress-relieving building experience",
    ],
    inStock: true,
  },
  {
    id: "9",
    title: "Atomic Habits: An Easy & Proven Way to Build Good Habits",
    price: 13.79,
    originalPrice: 27.00,
    rating: 4.8,
    reviewCount: 234567,
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=400&fit=crop",
    category: "Books",
    brand: "James Clear",
    prime: true,
    badge: "#1 Best Seller",
    description: "James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits.",
    features: [
      "336 pages",
      "Available in Hardcover, Paperback, Kindle",
      "#1 New York Times bestseller",
      "Over 20 million copies sold",
      "Available in 50+ languages",
    ],
    inStock: true,
  },
  {
    id: "10",
    title: "Peloton Bike+ Stationary Exercise Bike with 24-inch Rotating Touchscreen",
    price: 2495.00,
    originalPrice: 2995.00,
    rating: 4.6,
    reviewCount: 8921,
    image: "https://images.unsplash.com/photo-1520877880798-5ee004e3f11e?w=400&h=400&fit=crop",
    category: "Sports",
    brand: "Peloton",
    prime: false,
    description: "The Peloton Bike+ features a 24-inch rotating touchscreen that lets you go from cycling class to floor stretching in one fluid motion.",
    features: [
      "24-inch rotating HD touchscreen",
      "Auto-Follow resistance",
      "Apple GymKit integration",
      "3-channel stereo sound system",
      "Unlimited Member profiles",
    ],
    inStock: true,
  },
  {
    id: "11",
    title: "CeraVe Moisturizing Cream | Body and Face Moisturizer",
    price: 16.08,
    originalPrice: 22.00,
    rating: 4.8,
    reviewCount: 189023,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
    category: "Beauty",
    brand: "CeraVe",
    prime: true,
    badge: "Amazon's Choice",
    description: "Developed with dermatologists, CeraVe Moisturizing Cream has a unique formula with three essential ceramides and hyaluronic acid.",
    features: [
      "Developed with dermatologists",
      "3 essential ceramides",
      "Hyaluronic acid",
      "Non-comedogenic",
      "Fragrance free",
    ],
    inStock: true,
  },
  {
    id: "12",
    title: "MacBook Air 13-inch Laptop with M3 chip",
    price: 1099.00,
    originalPrice: 1299.00,
    rating: 4.9,
    reviewCount: 23456,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    category: "Computers",
    brand: "Apple",
    prime: true,
    badge: "Amazon's Choice",
    description: "Supercharged by M3 chip, MacBook Air is more capable than ever. Up to 18 hours battery life.",
    features: [
      "Apple M3 chip with 8-core CPU",
      "8GB unified memory",
      "256GB SSD storage",
      "13.6-inch Liquid Retina display",
      "Up to 18 hours battery life",
    ],
    inStock: true,
  },
];

export const heroSlides = [
  {
    id: 1,
    title: "Shop kitchen must-haves",
    subtitle: "From coffee makers to cookware",
    bg: "from-amber-50 to-amber-100",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "All things beauty",
    subtitle: "Skincare, makeup & more",
    bg: "from-pink-50 to-pink-100",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Start looking sharp",
    subtitle: "Men's fashion picks",
    bg: "from-slate-50 to-slate-100",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Toys for little ones",
    subtitle: "Top picks for kids",
    bg: "from-blue-50 to-blue-100",
    image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=600&h=400&fit=crop",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q)
  );
}
