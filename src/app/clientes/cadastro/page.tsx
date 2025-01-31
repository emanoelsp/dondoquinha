"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleCpfVerify } from "../utilitarios/validacpf";
import { handleCepVerify } from "../utilitarios/verificacep";
import { PersonalInfoForm } from "./infosPessoal";
import { PasswordForm } from "./infosSenha";
import { AddressForm } from "./infosEndereco";
import { formSchema, type FormSchema } from "../utilitarios/validacampos";
import { isValidEmail, isCepData } from "../utilitarios/mascaras";

export default function CustomerRegistration() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [cpfMessageClass, setCpfMessageClass] = useState("");
  const [cepMessageClass, setCepMessageClass] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMatchMessage, setPasswordMatchMessage] = useState("");
  const [isCpfInvalid, setIsCpfInvalid] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: FormSchema) {
    setIsSubmitting(true);
    setTimeout(() => {
      console.log(values);
      setSuccessMessage("Cadastro realizado com sucesso!");
      setIsSubmitting(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    }, 1500);
  }

  async function handleCpfBlur(event: React.FocusEvent<HTMLInputElement>) {
    const cpf = event.target.value;
    try {
      const message = await handleCpfVerify(cpf);
      setSubmitMessage(message);
      const isInvalid = message.includes("CPF inválido");
      setIsCpfInvalid(isInvalid);
      setCpfMessageClass(isInvalid ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800");
    } catch (error) {
      setSubmitMessage("Erro ao verificar CPF.");
      setIsCpfInvalid(true);
      setCpfMessageClass("bg-red-100 text-red-800");
    }
  }

  async function handleEmailBlur(event: React.FocusEvent<HTMLInputElement>) {
    const email = event.target.value;
    const isValid = isValidEmail(email);

    if (!isValid) {
      setEmailValid(false);
      setEmailMessage("Por favor, insira um e-mail válido.");
    } else {
      setEmailValid(true);
      setEmailMessage("E-mail válido.");
    }
  }

  async function handleCepBlur(event: React.FocusEvent<HTMLInputElement>) {
    const cep = event.target.value;
    try {
      const data = await handleCepVerify(cep);
      if (isCepData(data)) {
        setValue("address", data.logradouro || "");
        setValue("city", data.localidade || "");
        setValue("state", data.uf || "");
        setSubmitMessage("CEP válido");
        setCepMessageClass("bg-green-100 text-green-800");
      } else {
        setSubmitMessage("Ocorreu um erro ao buscar o CEP.");
        setCepMessageClass("bg-red-100 text-red-800");
      }
    } catch (error) {
      setSubmitMessage("Ocorreu um erro ao buscar o CEP.");
      setCepMessageClass("bg-red-100 text-red-800");
    }
  }

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    if (password && confirmPassword) {
      const doPasswordsMatch = password === confirmPassword;
      setPasswordMatch(doPasswordsMatch);
      setPasswordMatchMessage(doPasswordsMatch ? "Senhas coincidem" : "As senhas não coincidem");
    } else {
      setPasswordMatchMessage("");
    }
  }, [password, confirmPassword]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-36 p-6">
      {successMessage && (
        <div className="fixed top-4 right-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded shadow-md">
          {successMessage}
        </div>
      )}
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
          handleEmailBlur={handleEmailBlur} // Passando a função de validação de e-mail
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
  );
}