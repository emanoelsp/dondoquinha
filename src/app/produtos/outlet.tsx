import Image from 'next/image'
import { Mail } from 'lucide-react'

const outletImages = [
  { src: '/imagens/outlet-main.png', alt: 'Outlet main image' },
  ...Array(9).fill(null).map((_, i) => ({ src: `/imagens/outlet${i + 1}.png`, alt: `Outlet product ${i + 1}` }))
]

export default function OutletAndNewsletter() {
  return (
    <>
      <section className="px-4 md:px-16 pb-10 mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-pink-600">Outlet</h2>
          <div className="flex items-center justify-center">
            <hr className="w-16 md:w-60 border-2 border-pink-600" />
            <span className="mx-4 text-4xl md:text-6xl">🎀</span>
            <hr className="w-16 md:w-60 border-2 border-pink-600" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1 h-96 relative rounded-lg overflow-hidden shadow-lg">
            <Image
              src={outletImages[0].src}
              alt={outletImages[0].alt}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {outletImages.slice(1).map((img, i) => (
              <div key={i} className="aspect-square relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <Image
                  src={img.src}
                  alt={img.alt}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl p-8 md:p-12 bg-gradient-to-r from-pink-100 to-pink-200 rounded-lg relative overflow-hidden mb-16">
        <div className="absolute -rotate-6 opacity-10 inset-0 flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            fill="none"
            className="w-[400px] h-[200px] text-pink-500"
          >
            <path d="M2 8c-1.1 0-2 .9-2 2v44c0 1.1.9 2 2 2h60c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2H2zm0 4h60v8L32 40 2 20v-8zm30 18L4 24v24h56V24L32 30z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <rect x="10" y="14" width="44" height="30" fill="currentColor" />
            <line x1="2" y1="14" x2="32" y2="34" stroke="currentColor" strokeWidth="2" />
            <line x1="62" y1="14" x2="32" y2="34" stroke="currentColor" strokeWidth="2" />
          </svg>

        </div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-pink-600 mb-2">Receba nossas novidades</h2>
            <p className="text-pink-700">Inscreva-se para receber ofertas exclusivas e novidades!</p>
          </div>

          <form className="flex w-full md:w-auto mt-4 md:mt-0">
            <input
              type="email"
              placeholder="Seu e-mail"
              className="w-full md:w-64 px-4 py-2 rounded-l-md border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
            />
            <button className="bg-pink-500 text-white px-6 py-2 rounded-r-md font-semibold hover:bg-pink-600 transition duration-300 flex items-center">
              <Mail className="mr-2 h-5 w-5" />
              Inscrever
            </button>
          </form>
        </div>
      </section>
    </>
  )
}