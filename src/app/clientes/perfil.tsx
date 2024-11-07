'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Nome completo deve ter pelo menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Email inválido.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Número de telefone inválido.",
  }),
  address: z.string().min(5, {
    message: "Endereço deve ter pelo menos 5 caracteres.",
  }),
  city: z.string().min(2, {
    message: "Cidade deve ter pelo menos 2 caracteres.",
  }),
  state: z.string().min(2, {
    message: "Estado deve ter pelo menos 2 caracteres.",
  }),
  zipCode: z.string().min(5, {
    message: "CEP inválido.",
  }),
  gender: z.string().optional(),
  birthDate: z.string().optional(),
})

export default function CustomerProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "João Silva",
      email: "joao.silva@example.com",
      phoneNumber: "(11) 98765-4321",
      address: "Rua das Flores, 123",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-567",
      gender: "male",
      birthDate: "1990-01-01",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    // Simular atualização do perfil
    setTimeout(() => {
      console.log(values)
      setSubmitMessage('Perfil atualizado com sucesso!')
      setIsSubmitting(false)
      setIsEditing(false)
    }, 1500)
  }

  function handleDeleteAccount() {
    // Simular exclusão da conta
    setTimeout(() => {
      console.log("Conta excluída")
      setSubmitMessage('Sua conta foi excluída permanentemente.')
      setShowDeleteConfirm(false)
    }, 1500)
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-pink-500 text-white p-6">
        <h2 className="text-2xl font-bold">Perfil do Cliente</h2>
        <p className="text-pink-100">Gerencie suas informações pessoais</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Nome Completo</label>
            <input
              id="fullName"
              {...register("fullName")}
              disabled={!isEditing}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 disabled:bg-gray-100"
            />
            {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              {...register("email")}
              disabled={!isEditing}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 disabled:bg-gray-100"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Telefone</label>
          <input
            id="phoneNumber"
            {...register("phoneNumber")}
            disabled={!isEditing}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 disabled:bg-gray-100"
          />
          {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>}
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Endereço</label>
          <input
            id="address"
            {...register("address")}
            disabled={!isEditing}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 disabled:bg-gray-100"
          />
          {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">Cidade</label>
            <input
              id="city"
              {...register("city")}
              disabled={!isEditing}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 disabled:bg-gray-100"
            />
            {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>}
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">Estado</label>
            <input
              id="state"
              {...register("state")}
              disabled={!isEditing}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 disabled:bg-gray-100"
            />
            {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>}
          </div>
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">CEP</label>
            <input
              id="zipCode"
              {...register("zipCode")}
              disabled={!isEditing}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 disabled:bg-gray-100"
            />
            {errors.zipCode && <p className="mt-1 text-sm text-red-600">{errors.zipCode.message}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gênero</label>
            <select
              id="gender"
              {...register("gender")}
              disabled={!isEditing}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 disabled:bg-gray-100"
            >
              <option value="">Selecione o gênero</option>
              <option value="male">Masculino</option>
              <option value="female">Feminino</option>
              <option value="other">Outro</option>
              <option value="prefer-not-to-say">Prefiro não dizer</option>
            </select>
          </div>
          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">Data de Nascimento</label>
            <input
              id="birthDate"
              type="date"
              {...register("birthDate")}
              disabled={!isEditing}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 disabled:bg-gray-100"
            />
          </div>
        </div>
        <div className="flex justify-between items-center mt-6">
          {isEditing ? (
            <>
              <button
                type="submit"
                disabled={isSubmitting}
                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50"
              >
                {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Cancelar
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Editar Perfil
              </button>
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Excluir Conta
              </button>
            </>
          )}
        </div>
        {submitMessage && (
          <div className="mt-3 text-sm text-green-600 text-center">{submitMessage}</div>
        )}
      </form>
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg shadow-xl">
            <h3 className="text-lg font-bold mb-2">Confirmar exclusão da conta</h3>
            <p className="mb-4">Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Confirmar Exclusão
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}