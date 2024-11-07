import { Star } from 'lucide-react'
import Image from 'next/image'

const reviews = [
  { id: 1, name: 'Maria Silva', rating: 5, comment: 'Adorei o laço! Ficou perfeito na minha filha.', productImage: '/images/product1.jpg' },
  { id: 2, name: 'Ana Santos', rating: 4, comment: 'Tiara muito elegante, recomendo!', productImage: '/images/product2.jpg' },
  { id: 3, name: 'Carla Oliveira', rating: 5, comment: 'Presilha de ótima qualidade, entrega rápida.', productImage: '/images/product3.jpg' },
  { id: 4, name: 'Juliana Costa', rating: 5, comment: 'Faixa linda, minha bebê adorou!', productImage: '/images/product4.jpg' },
  { id: 5, name: 'Patricia Ferreira', rating: 4, comment: 'Produto excelente, só demorou um pouco na entrega.', productImage: '/images/product5.jpg' },
  { id: 6, name: 'Fernanda Lima', rating: 5, comment: 'Superou minhas expectativas, voltarei a comprar!', productImage: '/images/product6.jpg' },
]

export default function ReviewsSection() {
  return (
    <section className="px-4 md:px-16 pb-10 mx-auto max-w-7xl">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-pink-600">Avaliações</h2>
        <div className="flex items-center justify-center">
          <hr className="w-16 md:w-60 border-2 border-pink-600" />
          <span className="mx-4 text-4xl md:text-6xl">🎀</span>
          <hr className="w-16 md:w-60 border-2 border-pink-600" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                <Image
                  src={review.productImage}
                  alt={`Produto avaliado por ${review.name}`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div>
                <p className="font-semibold text-pink-700">{review.name}</p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600 italic">&ldquo;{review.comment}&rdquo;</p>
          </div>
        ))}
      </div>
    </section>
  )
}