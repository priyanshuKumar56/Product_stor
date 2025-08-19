"use client";

import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error("Error parsing cart data:", error);
        localStorage.removeItem("cartItems");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    console.log("[v0] Cart items updated:", cartItems);
  }, [cartItems]);

  const addToCart = (product, selectedColor, selectedSize) => {
    console.log("[v0] addToCart function called with:", {
      product,
      selectedColor,
      selectedSize,
    });

    setCartItems((prevItems) => {
      console.log("[v0] Previous cart items:", prevItems);

      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.productId === product.id &&
          item.color === selectedColor &&
          item.size === selectedSize
      );

      if (existingItemIndex >= 0) {
        console.log("[v0] Found existing item, updating quantity");
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        console.log("[v0] Updated items:", updatedItems);
        return updatedItems;
      }

      const newItem = {
        id: `${product.id}-${selectedColor}-${selectedSize}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        color: selectedColor,
        size: selectedSize,
        quantity: 1,
        imageUrl: product.imageUrl,
      };

      console.log("[v0] Adding new item:", newItem);
      const newItems = [...prevItems, newItem];
      console.log("[v0] New cart items:", newItems);
      return newItems;
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
