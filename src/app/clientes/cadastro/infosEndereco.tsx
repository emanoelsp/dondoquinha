import type React from "react"
import type { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form"
import type { FormSchema } from "../utilitarios/validacampos"
import { maskCEP } from "../utilitarios/mascaras"

interface AddressFormProps {
  register: UseFormRegister<FormSchema>
  errors: FieldErrors<FormSchema>
  setValue: UseFormSetValue<FormSchema>
  handleCepBlur: (event: React.FocusEvent<HTMLInputElement>) => void
  submitMessage: string
  cepMessageClass: string
}

export const AddressForm: React.FC<AddressFormProps> = ({
  register,
  errors,
  handleCepBlur,
  submitMessage,
  cepMessageClass,
}) => {
  return (
    <>
      <div>
        <p className="bg-blue-200 p-2 mb-2">Digite o CEP para encontrar seu endereço</p>
        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
          CEP
        </label>
        <input
          id="zipCode"
          {...register("zipCode")}
          onBlur={handleCepBlur}
          onChange={(e) => {
            e.target.value = maskCEP(e.target.value)
            register("zipCode").onChange(e)
          }}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-blue-500"
        />
        {errors.zipCode && <p className="mt-1 text-sm text-red-600">{errors.zipCode.message}</p>}
        {submitMessage && submitMessage.includes("CEP") && (
          <div className={`mt-1 text-sm p-2 rounded ${cepMessageClass}`}>{submitMessage}</div>
        )}
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Endereço
        </label>
        <input
          id="address"
          {...register("address")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-blue-500"
        />
        {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
      </div>

      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
          Cidade
        </label>
        <input
          id="city"
          {...register("city")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-blue-500"
        />
        {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>}
      </div>

      <div>
        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
          Estado
        </label>
        <input
          id="state"
          {...register("state")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-blue-500"
        />
        {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>}
      </div>

      <div>
        <label htmlFor="number" className="block text-sm font-medium text-gray-700">
          Número
        </label>
        <input
          id="number"
          {...register("number")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-blue-500"
        />
        {errors.number && <p className="mt-1 text-sm text-red-600">{errors.number.message}</p>}
      </div>

      <div>
        <label htmlFor="complement" className="block text-sm font-medium text-gray-700">
          Complemento
        </label>
        <input
          id="complement"
          {...register("complement")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-blue-500"
        />
        {errors.complement && <p className="mt-1 text-sm text-red-600">{errors.complement.message}</p>}
      </div>
    </>
  )
}

