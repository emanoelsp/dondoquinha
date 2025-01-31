import React, { useState } from "react"
import type { UseFormRegister, FieldErrors } from "react-hook-form"
import type { FormSchema } from "../utilitarios/validacampos"
import { FaEye, FaEyeSlash } from "react-icons/fa" // Importando ícones de olho

interface PasswordFormProps {
  register: UseFormRegister<FormSchema>
  errors: FieldErrors<FormSchema>
  passwordMatch: boolean
  passwordMatchMessage: string
}

export const PasswordForm: React.FC<PasswordFormProps> = ({
  register,
  errors,
  passwordMatch,
  passwordMatchMessage,
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Senha
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-blue-500"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirmar Senha
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword")}
            className={`mt-1 block w-full px-3 py-2 border ${
              passwordMatch ? "border-gray-300" : "border-red-500"
            } rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-blue-500`}
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {passwordMatchMessage && (
          <p
            className={`mt-1 text-sm p-2 rounded ${
              passwordMatch ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {passwordMatchMessage}
          </p>
        )}
        {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
      </div>
    </>
  )
}