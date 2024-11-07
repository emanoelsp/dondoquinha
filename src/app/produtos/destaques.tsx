'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronDown, ShoppingCart } from 'lucide-react'

const products = [
  { id: 1, name: 'Laço Encantado', price: 99.90, image: '/imagens/produto1.png', description: 'Laço delicado para ocasiões especiais.' },
  { id: 2, name: 'Tiara Elegante', price: 89.90, image: '/imagens/produto2.png', description: 'Tiara sofisticada para eventos formais.' },
  { id: 3, name: 'Presilha Floral', price: 79.90, image: '/imagens/produto3.png', description: 'Presilha com design floral para o dia a dia.' },
  { id: 4, name: 'Faixa Luxuosa', price: 69.90, image: '/imagens/produto4.png', description: 'Faixa luxuosa para complementar seu visual.' },
  { id: 5, name: 'Laço Festivo', price: 109.90, image: '/imagens/produto1.png', description: 'Laço perfeito para festas e celebrações.' },
  { id: 6, name: 'Tiara Perolada', price: 129.90, image: '/imagens/produto2.png', description: 'Tiara com pérolas para um toque de classe.' },
  { id: 7, name: 'Presilha Brilhante', price: 59.90, image: '/imagens/produto3.png', description: 'Presilha com brilhantes para iluminar seu cabelo.' },
  { id: 8, name: 'Faixa Romântica', price: 84.90, image: '/imagens/produto4.png', description: 'Faixa com design romântico para looks delicados.' },
]

export default function FeaturedProducts() {
  const [showMore, setShowMore] = useState(false)

  const displayedProducts = showMore ? products : products.slice(0, 4)

  return (
    <section className="my-10 px-4 md:px-16 pb-10 mx-auto max-w-7xl">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-pink-600">Produtos em Destaque</h2>
        <div className="flex items-center justify-center">
          <hr className="w-16 md:w-60 border-2 border-pink-600" />
          <span className="mx-4 text-4xl md:text-6xl">🎀</span>
          <hr className="w-16 md:w-60 border-2 border-pink-600" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {displayedProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48 w-full">
              <Image
                src={product.image}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 text-pink-600">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
              <p className="text-lg font-bold text-pink-500 mb-4">R$ {product.price.toFixed(2)}</p>
              <button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <button
          onClick={() => setShowMore(!showMore)}
          className="flex items-center text-lg bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
        >
          {showMore ? 'Mostrar menos' : 'Mais produtos em destaque'}
          <ChevronDown className={`ml-2 h-5 w-5 transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </section>
  )
}