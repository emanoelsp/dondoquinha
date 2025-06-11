'use client'

import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import Image from 'next/image'

// Definindo a interface para uma categoria
interface Category {
  id: number
  name: string
  image: string | undefined // Alterando null para undefined
}

export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: 'Category 1', image: '/placeholder.svg' },
    { id: 2, name: 'Category 2', image: '/placeholder.svg' },
  ])

  const [newCategory, setNewCategory] = useState({
    name: '',
    image: undefined as string | undefined, // Alterando null para undefined
  })

  // Definindo o tipo para o evento de input (evento de mudança de texto)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewCategory(prev => ({ ...prev, [name]: value }))
  }

  // Definindo o tipo para o evento de upload de imagem
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] // Usando a abordagem segura de acessar o arquivo
    if (file) {
      setNewCategory(prev => ({ ...prev, image: URL.createObjectURL(file) }))
    }
  }

  // Definindo o tipo para o evento de submit do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const categoryToAdd: Category = {
      id: categories.length + 1,
      ...newCategory,
    }
    setCategories(prev => [...prev, categoryToAdd])
    setNewCategory({ name: '', image: undefined }) // Alterando null para undefined
  }

  const handleEdit = (id: number) => {
    // Implementar funcionalidade de edição
    console.log('Edit category', id)
  }

  const handleDelete = (id: number) => {
    setCategories(prev => prev.filter(category => category.id !== id))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Categorias</h1>
      
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <input
          type="text"
          name="name"
          value={newCategory.name}
          onChange={handleInputChange}
          placeholder="Nome da categoria"
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="file"
          onChange={handleImageUpload}
          accept="image/*"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Adicionar Categoria</button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="border p-4 rounded">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-semibold">{category.name}</h2>
              <div className="flex space-x-2">
                <button onClick={() => handleEdit(category.id)}>
                  <Pencil className="h-4 w-4" />
                </button>
                <button onClick={() => handleDelete(category.id)}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <Image
              src={category.image || '/placeholder.svg'}
              alt={category.name}
              width={100}
              height={100}
              className="mb-2 rounded"
              onError={() => setNewCategory(prev => ({ ...prev, image: '/placeholder.svg' }))}
            />

            <div className="text-sm text-gray-500">
              ID: {category.id} | Nome: {category.name} | Imagem: {category.image ? 'Carregada' : 'Nenhuma imagem'}   
            </div>  

           
          </div>
        ))}
      </div>
    </div>
  )
}
