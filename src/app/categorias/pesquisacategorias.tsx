'use client'

import Image from 'next/image'
import { Search, Image as ImageIcon } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const categories = [
  { name: 'Laços', image: '/imagens/product1.jpg' },
  { name: 'Tiaras', image: '/imagens/product2.jpg' },
  { name: 'Presilhas', image: '/imagens/product3.jpg' },
  { name: 'Pulseiras', image: '/imagens/product4.jpg' },
  { name: 'Bolsas', image: '/imagens/product5.jpg' },
  { name: 'Faixas', image: '/imagens/product6.jpg' },
]

export default function CategoriesAndSearch() {
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({})
  const [imagePaths, setImagePaths] = useState<string[]>([])

  useEffect(() => {
    const paths = categories.map(category => category.image)
    setImagePaths(paths)
    console.log('Caminhos das imagens:', paths)
  }, [])

  const handleImageError = (categoryName: string) => {
    setImageError(prev => ({ ...prev, [categoryName]: true }))
    console.error(`Erro ao carregar imagem para a categoria: ${categoryName}`)
  }

  return (
    <section className="px-4 md:px-16 pb-10 mx-auto max-w-7xl">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-pink-600">Acessórios</h2>
        <div className="flex items-center justify-center">
          <hr className="w-16 md:w-60 border-2 border-pink-600" />
          <span className="mx-4 text-4xl md:text-6xl">🎀</span>
          <hr className="w-16 md:w-60 border-2 border-pink-600" />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
        {categories.map((category) => (
          <Link href={`/produtos?categoria=acessorios&subcategoria=${category.name.toLowerCase()}`} key={category.name}>
            <div className="relative overflow-hidden rounded-lg shadow-md group cursor-pointer">
              <div className="aspect-w-1 aspect-h-1 w-full h-40">
                {!imageError[category.name] ? (
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={160}
                    height={160}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                    onError={() => handleImageError(category.name)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-pink-100 text-pink-600">
                    <ImageIcon className="w-12 h-12 mb-2" />
                    <span className="text-sm">{category.name}</span>
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-pink-600 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
              <p className="absolute bottom-0 left-0 right-0 text-center bg-white bg-opacity-80 p-2 text-pink-600 font-semibold transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                {category.name}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="p-4 mx-auto">
        <form className="mx-auto p-8 md:p-12 bg-gradient-to-r from-pink-100 to-pink-200 rounded-lg relative overflow-hidden mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-4 text-center">
              <h3 className="text-3xl font-bold mb-6 text-pink-600">
                Encontre os seus desejos:
              </h3>
            </div>

            <div className="col-span-1 md:col-span-2 space-y-6">
              <div>
                <label htmlFor="product-name" className="block text-sm font-medium text-pink-700 mb-1">
                  Nome do produto
                </label>
                <input
                  id="product-name"
                  type="text"
                  className="w-full px-4 py-2 rounded-md border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-pink-400 transition duration-200 ease-in-out bg-white"
                  placeholder="Digite o nome do produto"
                />
              </div>
              <div>
                <h4 className="font-semibold text-pink-700 mb-2">Escolha a categoria:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <label className="flex items-center space-x-2" key={category.name}>
                      <input type="checkbox" className="form-checkbox text-pink-500 rounded focus:ring-pink-500" />
                      <span className="text-pink-600">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-1 md:col-span-2 space-y-6">
              <div>
                <h4 className="font-semibold text-pink-700 mb-2">Escolha a cor:</h4>
                <input
                  type="color"
                  className="w-full h-10 rounded-md border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200 ease-in-out cursor-pointer"
                  defaultValue="#FFC0CB"
                />
              </div>
              <div>
                <h4 className="font-semibold text-pink-700 mb-2">Escolha o tamanho:</h4>
                <div className="flex space-x-4">
                  {['P', 'M', 'G', 'GG'].map((size) => (
                    <label className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-pink-400 cursor-pointer hover:bg-pink-100 transition duration-200 ease-in-out" key={size}>
                      <input type="checkbox" className="sr-only" />
                      <span className="text-pink-600 font-medium">{size}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-1 md:col-span-4 flex justify-center mt-6">
              <button className="bg-pink-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-pink-700 transition duration-300 ease-in-out shadow-lg flex items-center space-x-2">
                <Search className="w-5 h-5" />
                <span>Pesquisar</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}