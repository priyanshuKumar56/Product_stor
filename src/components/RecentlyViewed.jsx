"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export default function RecentlyViewed({ onProductSelect }) {
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);

  useEffect(() => {
    const loadRecentlyViewed = () => {
      try {
        const stored = localStorage.getItem("recentlyViewed");
        if (stored) {
          const products = JSON.parse(stored);
          setRecentlyViewedProducts(products.slice(0, 3));
        }
      } catch (error) {
        console.error("Error loading recently viewed products:", error);
      }
    };

    loadRecentlyViewed();

    window.addToRecentlyViewed = (product) => {
      try {
        const stored = localStorage.getItem("recentlyViewed");
        let products = stored ? JSON.parse(stored) : [];

        // Remove if already exists to avoid duplicates
        products = products.filter((p) => p.id !== product.id);

        // Add to beginning of array
        products.unshift({
          id: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
        });

        // Keep only last 3 unique products
        products = products.slice(0, 3);

        localStorage.setItem("recentlyViewed", JSON.stringify(products));
        setRecentlyViewedProducts(products);
      } catch (error) {
        console.error("Error saving recently viewed product:", error);
      }
    };

    return () => {
      delete window.addToRecentlyViewed;
    };
  }, []);

  if (recentlyViewedProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 pt-8 border-t border-slate-200">
      <div className="flex items-center gap-3 mb-8">
        <Eye className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-slate-800">Recently Viewed</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recentlyViewedProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => onProductSelect && onProductSelect(product)}
            className="group bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <div className="aspect-square bg-slate-100 overflow-hidden">
              <img
                src={product.imageUrl || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-blue-600 font-bold mt-2">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
