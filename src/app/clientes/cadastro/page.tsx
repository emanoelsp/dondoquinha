"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { auth, db } from "../../../firebase/config"
import { handleCpfVerify } from "../utilitarios/validacpf"
import { handleCepVerify } from "../utilitarios/verificacep"
import { formSchema, type FormSchema } from "../utilitarios/validacampos"
import { isValidEmail, isCepData } from "../utilitarios/mascaras"
import { PersonalInfoForm } from "./infosPessoal"
import { PasswordForm } from "./infosSenha"
import { AddressForm } from "./infosEndereco"

export default function CustomerRegistration() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [cepMessageClass, setCepMessageClass] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [passwordMatch, setPasswordMatch] = useState(true)
  const [emailValid, setEmailValid] = useState(true)
  const [emailMessage, setEmailMessage] = useState("")
  const [passwordMatchMessage, setPasswordMatchMessage] = useState("")
  const [isCpfInvalid, setIsCpfInvalid] = useState(false)

  const {
    register,
    formState: { errors },
    setValue,
    watch,
    handleSubmit,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  useEffect(() => {
    if (successMessage) {
      setShowSuccessMessage(true)
      const timer = setTimeout(() => {
        setShowSuccessMessage(false)
        router.push("/login")
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [successMessage, router])

  const onSubmit = async (values: FormSchema) => {
    setIsSubmitting(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password)
      const user = userCredential.user

      await setDoc(doc(db, "clientes", user.uid), {
        fullName: values.fullName,
        email: values.email,
        cpf: values.cpf,
        phoneNumber: values.phoneNumber,
        address: values.address,
        city: values.city,
        state: values.state,
        zipCode: values.zipCode,
        number: values.number,
        complement: values.complement,
      })

      setSuccessMessage("Cadastro realizado com sucesso! Redirecionando para a página de login...")
    } catch {
      console.error("Error during registration")
      setSubmitMessage("Erro ao realizar o cadastro. Por favor, tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCpfBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
    const cpf = event.target.value
    try {
      const message = await handleCpfVerify(cpf)
      setSubmitMessage(message)
      const isInvalid = message.includes("CPF inválido")
      setIsCpfInvalid(isInvalid)
    } catch {
      setSubmitMessage("Erro ao verificar CPF.")
      setIsCpfInvalid(true)
    }
  }

  const handleEmailBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const email = event.target.value
    const isValid = isValidEmail(email)

    if (!isValid) {
      setEmailValid(false)
      setEmailMessage("Por favor, insira um e-mail válido.")
    } else {
      setEmailValid(true)
      setEmailMessage("E-mail válido.")
    }
  }

  const handleCepBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
    const cep = event.target.value
    try {
      const data = await handleCepVerify(cep)
      if (isCepData(data)) {
        setValue("address", data.logradouro || "")
        setValue("city", data.localidade || "")
        setValue("state", data.uf || "")
        setSubmitMessage("CEP válido")
        setCepMessageClass("bg-green-100 text-green-800")
      } else {
        setSubmitMessage("Ocorreu um erro ao buscar o CEP.")
        setCepMessageClass("bg-red-100 text-red-800")
      }
    } catch {
      setSubmitMessage("Ocorreu um erro ao buscar o CEP.")
      setCepMessageClass("bg-red-100 text-red-800")
    }
  }

  const password = watch("password")
  const confirmPassword = watch("confirmPassword")

  useEffect(() => {
    if (password && confirmPassword) {
      const doPasswordsMatch = password === confirmPassword
      setPasswordMatch(doPasswordsMatch)
      setPasswordMatchMessage(doPasswordsMatch ? "Senhas coincidem" : "As senhas não coincidem")
    } else {
      setPasswordMatchMessage("")
    }
  }, [password, confirmPassword])

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-36 p-6">
      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="fixed top-4 right-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded shadow-md"
          >
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="bg-pink-500 text-white p-6">
        <h2 className="text-2xl font-bold">Cadastro de Cliente</h2>
        <p className="text-pink-100">Crie sua conta para começar a comprar</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
        <PersonalInfoForm
          register={register}
          errors={errors}
          emailValid={emailValid}
          emailMessage={emailMessage}
          handleCpfBlur={handleCpfBlur}
          handleEmailBlur={handleEmailBlur}
          submitMessage={submitMessage}
          cpfMessageClass={isCpfInvalid ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}
        />
        <PasswordForm
          register={register}
          errors={errors}
          passwordMatch={passwordMatch}
          passwordMatchMessage={passwordMatchMessage}
        />
        <AddressForm
          register={register}
          errors={errors}
          setValue={setValue}
          handleCepBlur={handleCepBlur}
          submitMessage={submitMessage}
          cepMessageClass={cepMessageClass}
        />
        <div className="flex items-center">
          <input
            id="termsAccepted"
            type="checkbox"
            {...register("termsAccepted")}
            className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
          />
          <label htmlFor="termsAccepted" className="ml-2 block text-sm text-gray-900">
            Eu aceito os termos e condições
          </label>
        </div>
        {errors.termsAccepted && <p className="mt-1 text-sm text-red-600">{errors.termsAccepted.message}</p>}

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 text-white font-semibold rounded-lg ${
              isSubmitting ? "bg-gray-400" : "bg-pink-500 hover:bg-pink-600"
            }`}
          >
            {isSubmitting ? "Enviando..." : "Cadastrar"}
          </button>
        </div>
      </form>
    </div>
  )
}
