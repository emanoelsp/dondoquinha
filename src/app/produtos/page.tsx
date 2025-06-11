import { Suspense } from 'react'
import ProductListing from './listaprodutos'

function ProductListingFallback() {
  return (
    <div className="container mx-auto px-4 py-8 mt-36">
      <div className="animate-pulse">
        <div className="h-8 bg-pink-200 rounded w-64 mb-8"></div>
        <div className="bg-gradient-to-r from-pink-100 to-pink-200 p-6 rounded-lg mb-8 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-pink-300 rounded"></div>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-6 bg-pink-200 rounded mb-4"></div>
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-10 bg-pink-100 rounded"></div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-grow">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white border rounded-lg overflow-hidden shadow-md">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-6 bg-pink-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded mb-4"></div>
                    <div className="h-10 bg-pink-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProdutosPage() {
  return (
    <Suspense fallback={<ProductListingFallback />}>
      <ProductListing />
    </Suspense>
  )
}
