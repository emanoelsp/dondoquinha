import Image from 'next/image'
import { ShoppingCart, Wand2 } from 'lucide-react'

const kits = [
  {
    id: 1,
    name: 'Kit Mágico',
    description: 'Descubra o poder do Kit Mágico! Com itens exclusivos, ele traz uma experiência de magia e encantamento, ideal para momentos inesquecíveis.',
    image: '/imagens/kit_magico.png',
  },
  {
    id: 2,
    name: 'Kit Encantador',
    description: 'O Kit Encantador é perfeito para transformar qualquer ambiente com um toque de charme e beleza. Descubra a magia do encanto!',
    image: '/imagens/kit_encantado.png',
  },
  {
    id: 3,
    name: 'Kit dos Sonhos',
    description: 'Realize seus sonhos com este kit inspirador, perfeito para quem busca criar momentos mágicos e memoráveis!',
    image: '/imagens/kit_sonhos.png',
  },
]

export default function KitsSection() {
  return (
    <section className="my-16 px-4 md:px-16 pb-2 mx-auto max-w-7xl">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-pink-600">Kits</h2>
        <div className="flex items-center justify-center">
          <hr className="w-16 md:w-60 border-2 border-pink-600" />
          <span className="mx-4 text-4xl md:text-6xl">🎀</span>
          <hr className="w-16 md:w-60 border-2 border-pink-600" />
        </div>
      </div>

      <div className="space-y-16">
        {kits.map((kit, index) => (
          <div key={kit.id} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center lg:space-x-8`}>
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h3 className="text-3xl font-bold text-pink-600 mb-4">{kit.name}</h3>
              <p className="text-gray-600 mb-8">{kit.description}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4 space-y-4 sm:space-y-0">
                <button className="w-full sm:w-auto px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors duration-300 flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Adicionar ao carrinho
                </button>
                <button className="w-full sm:w-auto px-6 py-3 text-pink-600 bg-white border-2 border-pink-500 rounded-lg shadow-lg hover:bg-pink-100 hover:border-pink-600 transition-all duration-300 flex items-center justify-center">
                  <Wand2 className="w-5 h-5 mr-2" />
                  Personalize seu kit
                </button>
              </div>
            </div>
            <div className="lg:w-1/2">
              <Image
                src={kit.image}
                alt={kit.name}
                width={400}
                height={400}
                className="w-full max-w-md mx-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-7xl p-8 md:p-12 bg-gradient-to-r from-pink-100 to-pink-200 rounded-lg relative overflow-hidden mb-10 mt-10">
        <div className="absolute rotate-[250deg] opacity-10 inset-0 flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            className="w-[400px] h-[300px]"
          >
            <path
              d="M32 2C14.7 2 0 16.7 0 34s14.7 32 32 32 32-14.7 32-32S49.3 2 32 2z"
              fill="#FECACA"
            />


            <path
              d="M32 8c7.7 0 14.6 3.2 19.7 8.3L32 35.1 12.3 16.3C17.4 11.2 24.3 8 32 8zm0 48c-7.7 0-14.6-3.2-19.7-8.3L32 32.9l19.7 15.8C46.6 52.8 39.7 56 32 56z"
              fill="#FB7185"
            />
            
            <circle
              cx="32"
              cy="32"
              r="6"
              fill="#FB7185"
              stroke="#FECACA"
              strokeWidth="1"
            />
            <circle
              cx="32"
              cy="32"
              r="3"
              fill="#FECACA"
              opacity="0.8"
            />
          </svg>
        </div>


        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-pink-600 mb-2">Encontre seu kit perfeito</h2>
            <p className="text-pink-700">Descubra algo supreendente!</p>
          </div>

          <form className="flex w-full md:w-auto mt-4 md:mt-0">

            <button className="px-8 py-4 bg-pink-500 text-white text-lg rounded-full font-semibold hover:bg-pink-600 transition-colors duration-300 transform hover:scale-105">
              Explore nossas opçoes
            </button>
          </form>
        </div>

      </div>
    </section>
  )
}