import { products } from "@/data/products";
import Header from "../components/Header";
import { CartProvider } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

function MyApp({ Component, pageProps }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // "list" or "details"

  const handleProductSelect = (product) => {
    if (typeof window !== "undefined" && window.addToRecentlyViewed) {
      window.addToRecentlyViewed(product);
    }
    setSelectedProduct(product);
    setViewMode("details");
  };

  const handleBackToList = () => {
    setViewMode("list");
    setSelectedProduct(null);
  };
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Welcome to MyStore</h1>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={() => handleProductSelect(product)}
              />
            ))}
          </div>
        </main>
      </div>
    </CartProvider>
  );
}

export default MyApp;
