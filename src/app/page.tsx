"use client"

import Image from 'next/image'
import { Truck, ShieldCheck, CreditCard, Star, User } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Search } from "lucide-react"
import Destaques from './produtos/destaques'
import Outlet from './produtos/outlet'
import Categorias from './categorias/pesquisacategorias'

import Avaliacoes from './avaliacoes/recentes'
import Kits from './produtos/kits'

const carouselImages = [
  '/imagens/cs_1.png',
  '/imagens/cs_2.png',
  '/imagens/cs_3.png',
]

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mx-auto space-y-16 mt-40 bg-pink-200">
      <section className="relative grid grid-cols-2 gap-4 mt-36 h-[80vh]">
        <div className="relative overflow-hidden h-full">
          {carouselImages.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={`Carousel image ${index + 1}`}
              fill
              style={{
                objectFit: 'cover',
                opacity: index === currentImage ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out',
              }}
            />
          ))}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${index === currentImage ? 'bg-white' : 'bg-gray-400'}`}
                onClick={() => setCurrentImage(index)}
              />
            ))}
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 text-pink-900 text-center bg-pink-200 opacity-75 p-4">
            <h2 className="text-5xl font-bold mb-2 tracking-wide relative text-shadow">
              Descubra nossas ofertas imperdíveis!
            </h2>
            <p className="text-2xl tracking-wide relative text-shadow">
              Qualidade e preços incríveis esperam por você.
            </p>
          </div>

          <style jsx>{`
                      .text-shadow {
                        text-shadow: 2px 2px 0px white, 
                                    -2px -2px 0px white,
                                    -2px 2px 0px white,
                                    2px -2px 0px whitw;
                      }
                    `}
          </style>

        </div>
        <div className="grid grid-rows-2 gap-4 h-full">
          <div className="relative h-full">
            <Image
              src="/imagens/anuncio1.png"
              alt="Static image 1"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="relative h-full">
            <Image
              src="/imagens/anuncio2.png"
              alt="Static image 2"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      <section className="px-16 justify-between items-center pb-10">
        <div className='flex justify-between items-center py-8 text-pink-600'>
          <div className="flex items-center">
            <div className="mx-4 text-5xl"> 🚚 </div>
            <span className="text-2xl font-semibold">Frete Rápido</span>
          </div>
          <div className="flex items-center">
            <div className="mx-4 text-5xl"> 🔒 </div>
            <span className="text-lg font-semibold">Compra Segura</span>
          </div>
          <div className="flex items-center">
            <div className="mx-4 text-5xl"> 🏷️ </div>
            <span className="text-lg font-semibold">Melhores Ofertas</span>
          </div>
          <div className="flex items-center">
            <div className="mx-4 text-5xl"> ❤️ </div>
            <span className="text-lg font-semibold">Clientes Satisfeitos</span>
          </div>
          <div className="flex items-center">
            <div className="mx-4 text-5xl"> 📞 </div>
            <span className="text-lg font-semibold">Atendimento Exclusivo</span>
          </div>
        </div>

        <div className="text-center p-8 rounded-lg my-8 text-pink-600">
          <h2 className="text-3xl font-bold mb-4">Tudo para transformar o visual do seu pequeno!</h2>
          <p className="text-lg mb-6">Descubra nossa coleção conheça algo encantador.</p>
          <button className="scale-150 bg-pink-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-pink-600 transition">
            Conheça toda nossa coleção
          </button>
        </div>
      </section>



     <Destaques />

     <Categorias />

    <Outlet />
     
    <Kits />

    <Avaliacoes />

    </div>
  )
}
