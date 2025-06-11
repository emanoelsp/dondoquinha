import * as z from "zod"

export const isValidEmail = (email: string) => {
  return z.string().email().safeParse(email).success
}

export const maskCPF = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1")
}

export const maskCEP = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{3})\d+?$/, "$1")
}

export const maskPhone = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})\d+?$/, "$1")
}

export type CepData = {
  logradouro: string
  localidade: string
  uf: string
}

export function isCepData(data: unknown): data is CepData {
  return (
    typeof data === "object" &&
    data !== null &&
    "logradouro" in data &&
    "localidade" in data &&
    "uf" in data
  )
}


