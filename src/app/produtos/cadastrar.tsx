'use client'

import { useState } from 'react'
import { PlusCircle, Pencil, Trash2, Image as ImageIcon } from 'lucide-react'

interface Product {
  id: number;
  name: string;
  description: string;
  costPrice: number;
  sellingPrice: number;
  images: string[];
}

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Product 1', description: 'Description 1', costPrice: 10, sellingPrice: 20, images: [] },
    { id: 2, name: 'Product 2', description: 'Description 2', costPrice: 15, sellingPrice: 30, images: [] },
  ])

  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    costPrice: 0,
    sellingPrice: 0,
    images: [],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewProduct(prev => ({ 
      ...prev, 
      [name]: name.includes('Price') ? parseFloat(value) || 0 : value 
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const imageUrls = files.map(file => URL.createObjectURL(file))
    setNewProduct(prev => ({ ...prev, images: [...prev.images, ...imageUrls] }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const productToAdd: Product = {
      id: products.length + 1,
      ...newProduct,
    }
    setProducts(prev => [...prev, productToAdd])
    setNewProduct({ name: '', description: '', costPrice: 0, sellingPrice: 0, images: [] })
  }

  const handleEdit = (id: number) => {
    console.log('Edit product', id)
  }

  const handleDelete = (id: number) => {
    setProducts(prev => prev.filter(product => product.id !== id))
  }

  return (
    
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-extrabold text-pink-500 mb-6">Gerenciar Produtos</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
        <div>
          <label htmlFor="name" className="text-sm text-gray-700">Nome do Produto</label>
          <input
            id="name"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            placeholder="Digite o nome do produto"
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <div>
          <label htmlFor="description" className="text-sm text-gray-700">Descrição</label>
          <textarea
            id="description"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            placeholder="Descreva o produto"
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="costPrice" className="text-sm text-gray-700">Preço de Custo (R$)</label>
            <input
              id="costPrice"
              name="costPrice"
              type="number"
              value={newProduct.costPrice}
              onChange={handleInputChange}
              placeholder="0.00"
              required
              min="0"
              step="0.01"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label htmlFor="sellingPrice" className="text-sm text-gray-700">Preço de Venda (R$)</label>
            <input
              id="sellingPrice"
              name="sellingPrice"
              type="number"
              value={newProduct.sellingPrice}
              onChange={handleInputChange}
              placeholder="0.00"
              required
              min="0"
              step="0.01"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>
        <div>
          <label htmlFor="images" className="text-sm text-gray-700">Imagens do Produto</label>
          <input
            id="images"
            type="file"
            onChange={handleImageUpload}
            multiple
            accept="image/*"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
        {newProduct.images.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-4">
            {newProduct.images.map((image, index) => (
              <img key={index} src={image} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover rounded-md" />
            ))}
          </div>
        )}
        <button type="submit" className="w-full py-3 bg-pink-500 text-white rounded-md flex items-center justify-center">
          <PlusCircle className="mr-2 h-5 w-5" /> Adicionar Produto
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold text-gray-800">{product.name}</span>
              <div className="flex space-x-2">
                <button onClick={() => handleEdit(product.id)}>
                  <Pencil className="h-5 w-5 text-pink-500" />
                </button>
                <button onClick={() => handleDelete(product.id)}>
                  <Trash2 className="h-5 w-5 text-pink-500" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">{product.description}</p>
            <div className="flex justify-between mb-4">
              <span className="text-sm text-gray-500">Custo: R${product.costPrice.toFixed(2)}</span>
              <span className="text-sm text-gray-500">Venda: R${product.sellingPrice.toFixed(2)}</span>
            </div>
            {product.images.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {product.images.map((image, index) => (
                  <img key={index} src={image} alt={`${product.name} - ${index + 1}`} className="w-full h-24 object-cover rounded-md" />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-24 bg-gray-100 rounded-md">
                <ImageIcon className="h-8 w-8 text-gray-500" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
