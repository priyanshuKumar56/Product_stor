"use client";

import { useState, useContext, useEffect } from "react";
import ProductDetails from "@/components/ProductDetails";
import RecentlyViewed from "@/components/RecentlyViewed";
import { CartContext } from "@/context/CartContext";

export default function ProductDetailsWrapper({ product }) {
  const { addToCart } = useContext(CartContext);

  const [selectedColor, setSelectedColor] = useState(
    product.variants[0]?.color || ""
  );
  const [selectedSize, setSelectedSize] = useState("");

  const availableSizesForColor =
    product.variants.find((variant) => variant.color === selectedColor)
      ?.sizes || [];

  useEffect(() => {
    setSelectedSize("");
  }, [selectedColor]);

  const handleAddToCart = () => {
    console.log("Add to cart clicked");
    console.log("Product:", product);
    console.log("Selected color:", selectedColor);
    console.log("Selected size:", selectedSize);
    console.log("addToCart function:", addToCart);

    if (!selectedColor) {
      alert("Please select a color.");
      return;
    }
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    console.log("Calling addToCart with:", {
      product,
      selectedColor,
      selectedSize,
    });
    addToCart(product, selectedColor, selectedSize);
    console.log("addToCart called successfully");

    // Show success feedback
    const button = document.querySelector("[data-add-to-cart]");
    if (button) {
      const originalText = button.textContent;
      button.textContent = "Added to Cart! ✓";
      button.classList.add("bg-green-600", "hover:bg-green-700");
      button.classList.remove("bg-blue-600", "hover:bg-blue-700");

      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove("bg-green-600", "hover:bg-green-700");
        button.classList.add("bg-blue-600", "hover:bg-blue-700");
      }, 2000);
    }
  };

  return (
    <div className="p-8">
      <ProductDetails
        product={product}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        onColorSelect={setSelectedColor}
        onSizeSelect={setSelectedSize}
        onAddToCart={handleAddToCart}
        availableSizesForColor={availableSizesForColor}
      />
      <RecentlyViewed />
    </div>
  );
}
