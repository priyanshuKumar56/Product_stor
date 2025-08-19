"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";

export default function ProductCard({ product, onSelect }) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <CardContent className="p-0">
        <div className=" bg-gray-100 rounded-t-lg overflow-hidden">
          <img
            src={product.imageUrl || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </span>
            <div className="flex gap-1">
              {product.variants.slice(0, 3).map((variant) => (
                <div
                  key={variant.color}
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: variant.hex }}
                  title={variant.color}
                />
              ))}
              {product.variants.length > 3 && (
                <span className="text-xs text-gray-500 ml-1">
                  +{product.variants.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link href={`products/${product.id}`}>
          <Button
            onClick={onSelect}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
