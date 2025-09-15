"use client"

import { Button } from "@workspace/ui/components/button"
import { useProductsQuery, useCreateProductMutation } from "@workspace/framework"
import { useState } from "react"

export default function Page() {
  const [showProducts, setShowProducts] = useState(false)
  
  // استفاده از framework hooks
  const { data: products, isLoading, error } = useProductsQuery({
    pageNo: 1,
    rowCount: 5,
    isActive: true,
  })

  const createProduct = useCreateProductMutation()

  const handleCreateProduct = async () => {
    try {
      await createProduct.mutateAsync({
        name: "Test Product",
        description: "A test product created via framework",
        price: 99.99,
        categoryId: "cat-1",
        isActive: true,
      })
      alert("Product created successfully!")
    } catch (error) {
      console.error("Failed to create product:", error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-svh p-8">
      <div className="flex flex-col items-center justify-center gap-6 max-w-4xl w-full">
        <h1 className="text-3xl font-bold">Framework Example</h1>
        
        <div className="flex gap-4">
          <Button 
            onClick={() => setShowProducts(!showProducts)}
            variant="outline"
          >
            {showProducts ? "Hide" : "Show"} Products
          </Button>
          
          <Button 
            onClick={handleCreateProduct}
            disabled={createProduct.isPending}
          >
            {createProduct.isPending ? "Creating..." : "Create Test Product"}
          </Button>
        </div>

        {showProducts && (
          <div className="w-full">
            <h2 className="text-xl font-semibold mb-4">Products List</h2>
            
            {isLoading && (
              <div className="text-center py-8">
                <p>Loading products...</p>
              </div>
            )}
            
            {error && (
              <div className="text-center py-8 text-red-500">
                <p>Error loading products: {error.message}</p>
              </div>
            )}
            
            {products && (
              <div className="grid gap-4">
                {products.data?.entries.length === 0 ? (
                  <p className="text-center py-8 text-gray-500">
                    No products found. Create one using the button above!
                  </p>
                ) : (
                  products.data?.entries.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4">
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-gray-600">{product.description}</p>
                      <p className="text-green-600 font-medium">${product.price}</p>
                      <p className="text-sm text-gray-500">
                        Category: {product.categoryName}
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        <div className="text-center text-sm text-gray-500 max-w-2xl">
          <p>
            This page demonstrates the framework package in action. 
            The products data is fetched using React Query hooks from the framework,
            and new products can be created using the mutation hooks.
          </p>
        </div>
      </div>
    </div>
  )
}
