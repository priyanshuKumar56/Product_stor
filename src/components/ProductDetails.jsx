"use client";

import { Star, Shield, Truck, RotateCcw } from "lucide-react";

export default function ProductDetails({
  product,
  selectedColor,
  selectedSize,
  onColorSelect,
  onSizeSelect,
  onAddToCart,
  availableSizesForColor,
}) {
  if (!product) {
    return <div className="text-center py-8">Product not found</div>;
  }

  const selectedVariant = product.variants.find(
    (v) => v.color === selectedColor
  );

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      {/* Product Image */}
      <div className="space-y-4">
        <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl overflow-hidden shadow-inner">
          <img
            src={product.imageUrl || "/placeholder.svg"}
            alt={`${product.name} in ${selectedColor}`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Thumbnail gallery */}
        <div className="flex gap-3">
          {product.variants.map((variant, index) => (
            <button
              key={variant.color}
              onClick={() => onColorSelect(variant.color)}
              className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                selectedColor === variant.color
                  ? "border-blue-500 ring-2 ring-blue-200"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <img
                src={`/placeholder.svg?height=64&width=64&query=${product.name} ${variant.color}`}
                alt={`${product.name} in ${variant.color}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <span className="text-slate-600">(128 reviews)</span>
          </div>

          <h1 className="text-4xl font-bold text-slate-900 leading-tight">
            {product.name}
          </h1>

          <p className="text-slate-600 text-lg leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-slate-900">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-lg text-slate-500 line-through">
              ${(product.price * 1.2).toFixed(2)}
            </span>
            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm font-medium">
              Save 20%
            </span>
          </div>
        </div>

        {/* Color Selector */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-slate-800">
            Color: <span className="text-blue-600">{selectedColor}</span>
          </h3>
          <div className="flex gap-3">
            {product.variants.map((variant) => (
              <button
                key={variant.color}
                className={`w-12 h-12 rounded-full border-3 transition-all duration-200 ${
                  selectedColor === variant.color
                    ? "border-blue-500 ring-4 ring-blue-200 scale-110"
                    : "border-slate-300 hover:border-slate-400 hover:scale-105"
                }`}
                style={{ backgroundColor: variant.hex }}
                onClick={() => onColorSelect(variant.color)}
                title={variant.color}
                aria-label={`Select ${variant.color} color`}
              />
            ))}
          </div>
        </div>

        {/* Size Selector */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-slate-800">
            Size:{" "}
            <span className="text-blue-600">
              {selectedSize || "Select a size"}
            </span>
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {availableSizesForColor.map((size) => (
              <button
                key={size}
                className={`py-3 px-4 rounded-xl border-2 font-medium transition-all duration-200 ${
                  selectedSize === size
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                    : "bg-white text-slate-700 border-slate-300 hover:border-blue-400 hover:shadow-md"
                } focus:outline-none focus:ring-4 focus:ring-blue-200`}
                onClick={() => onSizeSelect(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={onAddToCart}
          data-add-to-cart
          disabled={!selectedColor || !selectedSize}
          className="w-full py-4 bg-blue-600 text-white text-xl font-bold rounded-xl shadow-lg hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-200"
        >
          {!selectedColor || !selectedSize ? "Select Options" : "Add to Cart"}
        </button>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-200">
          <div className="flex items-center gap-3 text-slate-600">
            <Truck className="h-5 w-5 text-blue-600" />
            <span className="text-sm">Free Shipping</span>
          </div>
          <div className="flex items-center gap-3 text-slate-600">
            <RotateCcw className="h-5 w-5 text-blue-600" />
            <span className="text-sm">30-Day Returns</span>
          </div>
          <div className="flex items-center gap-3 text-slate-600">
            <Shield className="h-5 w-5 text-blue-600" />
            <span className="text-sm">2-Year Warranty</span>
          </div>
          <div className="flex items-center gap-3 text-slate-600">
            <Star className="h-5 w-5 text-blue-600" />
            <span className="text-sm">Premium Quality</span>
          </div>
        </div>
      </div>
    </div>
  );
}
