'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

// Tipo para representar um produto
type Product = {
  id: number
  name: string
  price: number
  color: string
  age: string
  category: string
  subcategory?: string
  image: string
}

// Dados de exemplo para os produtos
const initialProducts: Product[] = [
  { id: 1, name: "Tiara Floral", price: 29.99, color: "Rosa", age: "Infantil", category: "Acessórios", subcategory: "Tiaras", image: "/placeholder.svg?height=200&width=200" },
  { id: 2, name: "Laço Cetim", price: 19.99, color: "Azul", age: "Infantil", category: "Acessórios", subcategory: "Laços", image: "/placeholder.svg?height=200&width=200" },
  { id: 3, name: "Kit Presilhas", price: 39.99, color: "Variado", age: "Infantil", category: "Kits", subcategory: "Presilhas", image: "/placeholder.svg?height=200&width=200" },
  { id: 4, name: "Bolsa Infantil", price: 59.99, color: "Rosa", age: "Infantil", category: "Acessórios", subcategory: "Bolsas", image: "/placeholder.svg?height=200&width=200" },
  { id: 5, name: "Pulseira Charm", price: 24.99, color: "Prata", age: "Infantil", category: "Acessórios", subcategory: "Pulseiras", image: "/placeholder.svg?height=200&width=200" },
  { id: 6, name: "Faixa de Cabelo", price: 14.99, color: "Branco", age: "Infantil", category: "Acessórios", subcategory: "Faixas", image: "/placeholder.svg?height=200&width=200" },
  { id: 7, name: "Kit Verão", price: 79.99, color: "Variado", age: "Infantil", category: "Kits", image: "/placeholder.svg?height=200&width=200" },
  { id: 8, name: "Tiara Outlet", price: 9.99, color: "Roxo", age: "Infantil", category: "Outlet", subcategory: "Tiaras", image: "/placeholder.svg?height=200&width=200" },
]

const categories = [
  { name: "Coleção", value: "" },
  { name: "Acessórios", value: "acessorios", subcategories: ["Tiaras", "Laços", "Presilhas", "Bolsas", "Pulseiras", "Faixas"] },
  { name: "Outlet", value: "outlet" },
  { name: "Kits", value: "kits" }
]

export default function ProductListing() {
  const [products] = useState<Product[]>(initialProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [selectedAge, setSelectedAge] = useState<string>('')
  const [sortOrder, setSortOrder] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('')

  const searchParams = useSearchParams()

  useEffect(() => {
    const category = searchParams.get('categoria')
    if (category) {
      setSelectedCategory(category)
    } else {
      setSelectedCategory('')
    }
  }, [searchParams])

  useEffect(() => {
    let result = [...products]

    // Filtrar por categoria
    if (selectedCategory) {
      result = result.filter(product => 
        selectedCategory === 'acessorios' ? product.category === 'Acessórios' :
        product.category.toLowerCase() === selectedCategory
      )
    }

    // Filtrar por subcategoria
    if (selectedSubcategory) {
      result = result.filter(product => product.subcategory === selectedSubcategory)
    }

    // Filtrar por preço
    result = result.filter(product => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Filtrar por cor
    if (selectedColor) {
      result = result.filter(product => product.color.toLowerCase() === selectedColor.toLowerCase())
    }

    // Filtrar por idade
    if (selectedAge) {
      result = result.filter(product => product.age.toLowerCase() === selectedAge.toLowerCase())
    }

    // Ordenar
    if (sortOrder === 'price-asc') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortOrder === 'price-desc') {
      result.sort((a, b) => b.price - a.price)
    } else if (sortOrder === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortOrder === 'name-desc') {
      result.sort((a, b) => b.name.localeCompare(a.name))
    }

    setFilteredProducts(result)
  }, [products, priceRange, selectedColor, selectedAge, sortOrder, selectedCategory, selectedSubcategory])

  return (
    <div className="container mx-auto px-4 py-8 mt-36">
      <h1 className="text-3xl font-bold text-pink-500 mb-8">Nossos Produtos</h1>
      
      {/* Filtros superiores */}
      <div className="bg-gradient-to-r from-pink-100 to-pink-200 p-6 rounded-lg mb-8 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label htmlFor="price-range" className="block text-sm font-medium text-gray-700 mb-2">
              Faixa de Preço: R${priceRange[0]} - R${priceRange[1]}
            </label>
            <input
              type="range"
              id="price-range"
              min="0"
              max="100"
              step="5"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="w-full h-2 bg-pink-300 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-2">Cor</label>
            <select
              id="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full p-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">Todas</option>
              <option value="Rosa">Rosa</option>
              <option value="Azul">Azul</option>
              <option value="Branco">Branco</option>
              <option value="Roxo">Roxo</option>
              <option value="Variado">Variado</option>
            </select>
          </div>
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">Idade</label>
            <select
              id="age"
              value={selectedAge}
              onChange={(e) => setSelectedAge(e.target.value)}
              className="w-full p-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">Todas</option>
              <option value="Infantil">Infantil</option>
              <option value="Adulto">Adulto</option>
            </select>
          </div>
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">Ordenar por</label>
            <select
              id="sort"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full p-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">Padrão</option>
              <option value="price-asc">Preço: Menor para Maior</option>
              <option value="price-desc">Preço: Maior para Menor</option>
              <option value="name-asc">Nome: A-Z</option>
              <option value="name-desc">Nome: Z-A</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Menu lateral */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-pink-500 mb-4">Categorias</h2>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <button
                    onClick={() => {
                      setSelectedCategory(category.value)
                      setSelectedSubcategory('')
                    }}
                    className={`w-full text-left px-4 py-2 rounded transition duration-300 ${
                      selectedCategory === category.value ? 'bg-pink-500 text-white' : 'hover:bg-pink-100'
                    }`}
                  >
                    {category.name}
                  </button>
                  {category.subcategories && selectedCategory === category.value && (
                    <ul className="ml-4 mt-2 space-y-1">
                      {category.subcategories.map((subcategory) => (
                        <li key={subcategory}>
                          <button
                            onClick={() => setSelectedSubcategory(subcategory)}
                            className={`w-full text-left px-3 py-1 rounded text-sm transition duration-300 ${
                              selectedSubcategory === subcategory ? 'bg-pink-300 text-white' : 'hover:bg-pink-50'
                            }`}
                          >
                            {subcategory}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Lista de produtos */}
        <div className="flex-grow">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
                <div className="relative h-48">
                  <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-pink-500">{product.name}</h3>
                  <p className="text-gray-600 mb-2 font-bold">R$ {product.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-500 mb-1">Cor: {product.color}</p>
                  <p className="text-sm text-gray-500 mb-1">Idade: {product.age}</p>
                  <p className="text-sm text-gray-500 mb-4">Categoria: {product.category}</p>
                  <button className="w-full bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50">
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}