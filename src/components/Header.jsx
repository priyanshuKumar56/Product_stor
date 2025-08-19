"use client";

import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { ShoppingCart, Store, Heart, User } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const { cartItems } = useContext(CartContext);

  const totalItemsInCart = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Store className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold bg-black bg-clip-text text-transparent">
              MyStore
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
            >
              Home
            </Link>
            <a
              href="/products"
              className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
            >
              Products
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-600 hover:text-blue-600 transition-colors">
              <User className="h-6 w-6" />
            </button>
            <Link
              href="/cart"
              className="relative p-2 text-slate-600 hover:text-blue-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItemsInCart > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {totalItemsInCart}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
