'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

const reviews = [
    {
        id: 1,
        productImage: '/path/to/product-image.jpg',
        name: 'Cliente A',
        rating: 4,
        comment: 'Produto ótimo! Super recomendo.',
        product: 'Produto 1',
        date: '2024-10-15',
        collection: 'Coleção A',
        category: 'Tiara',
    },
    {
        id: 2,
        productImage: '/path/to/product-image-2.jpg',
        name: 'Cliente B',
        rating: 5,
        comment: 'Perfeito, qualidade excelente!',
        product: 'Produto 2',
        date: '2024-10-16',
        collection: 'Coleção B',
        category: 'Outlet',
    },
];

const AvaliacaoPage = () => {
    const [filters, setFilters] = useState({
        stars: 0,
        product: '',
        date: '',
        collection: '',
        category: '',
    });

    const handleStarFilter = (starCount: number) => {
        setFilters((prev) => ({
            ...prev,
            stars: starCount,
        }));
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const filteredReviews = reviews.filter((review) => {
        return (
            (filters.stars ? review.rating >= filters.stars : true) &&
            (filters.product ? review.product.toLowerCase().includes(filters.product.toLowerCase()) : true) &&
            (filters.date ? review.date.includes(filters.date) : true) &&
            (filters.collection ? review.collection.toLowerCase().includes(filters.collection.toLowerCase()) : true) &&
            (filters.category ? review.category.toLowerCase().includes(filters.category.toLowerCase()) : true)
        );
    });

    return (
        <section className="container mx-auto px-4 py-8 mt-36">
            <h1 className="text-3xl font-bold text-pink-500 mb-8">Avaliações</h1>
            
            {/* Filtros superiores */}
            <div className="bg-gradient-to-r from-pink-100 to-pink-200 p-6 rounded-lg mb-8 shadow-md">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    
                    {/* Filtro por Estrelas */}
                    <div className="flex flex-col items-start">
                        <span className="text-pink-500 font-semibold">Filtrar por Estrelas:</span>
                        <div className="flex space-x-1 mt-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`w-6 h-6 cursor-pointer border border-pink-500 rounded-full ${star <= filters.stars ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                        }`}
                                    onClick={() => handleStarFilter(star)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Filtro por Produto */}
                    <input
                        type="text"
                        name="product"
                        value={filters.product}
                        onChange={handleFilterChange}
                        placeholder="Produto"
                        className="p-2 border border-pink-300 rounded-lg shadow focus:ring-pink-500 focus:border-pink-500"
                    />

                    {/* Filtro por Data */}
                    <input
                        type="date"
                        name="date"
                        value={filters.date}
                        onChange={handleFilterChange}
                        className="p-2 border border-pink-300 rounded-lg shadow focus:ring-pink-500 focus:border-pink-500"
                    />

                    {/* Filtro por Coleção */}
                    <select
                        name="collection"
                        value={filters.collection}
                        onChange={handleFilterChange}
                        className="p-2 border border-pink-300 rounded-lg shadow focus:ring-pink-500 focus:border-pink-500"
                    >
                        <option value="">Coleção</option>
                        <option value="Coleção A">Coleção A</option>
                        <option value="Coleção B">Coleção B</option>
                    </select>

                    {/* Filtro por Categoria */}
                    <select
                        name="category"
                        value={filters.category}
                        onChange={handleFilterChange}
                        className="p-2 border border-pink-300 rounded-lg shadow focus:ring-pink-500 focus:border-pink-500"
                    >
                        <option value="">Categoria</option>
                        <option value="Tiara">Tiara</option>
                        <option value="Bolsas">Bolsas</option>
                        <option value="Caos">Caos</option>
                        <option value="Presilhas">Presilhas</option>
                        <option value="Outlet">Outlet</option>
                        <option value="Kit">Kit</option>
                    </select>
                </div>
            </div>

            {/* Lista de Avaliações */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredReviews.map((review) => (
                    <div
                        key={review.id}
                        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-pink-500"
                    >
                        <div className="flex items-center mb-4">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-pink-500">
                                <Image
                                    src={review.productImage}
                                    alt={`Produto avaliado por ${review.name}`}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <div>
                                <p className="font-semibold text-pink-500">{review.name}</p>
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
                        <button className="mt-4 text-pink-500 font-semibold hover:underline hover:text-pink-700 transition-colors duration-200">Ver mais</button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AvaliacaoPage;
