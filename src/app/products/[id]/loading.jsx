export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-gray-600 text-lg font-medium">
          Loading product details...
        </p>
      </div>
    </div>
  );
}
