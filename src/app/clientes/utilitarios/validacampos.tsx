import * as z from "zod"

export const formSchema = z
  .object({
    fullName: z.string().min(1, { message: "Nome completo é obrigatório" }),
    email: z.string().email({ message: "Email inválido" }),
    password: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
    confirmPassword: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
    phoneNumber: z.string().min(1, { message: "Telefone é obrigatório" }),
    zipCode: z.string().length(9, { message: "CEP inválido" }),
    address: z.string().min(1, { message: "Endereço é obrigatório" }),
    city: z.string().min(1, { message: "Cidade é obrigatória" }),
    state: z.string().min(1, { message: "Estado é obrigatório" }),
    number: z.string().min(1, { message: "Número é obrigatório" }),
    complement: z.string().optional(),
    cpf: z.string().length(14, { message: "CPF deve ter 14 caracteres incluindo pontos e traço" }),
    termsAccepted: z.boolean().refine((val) => val, { message: "Você deve aceitar os termos" }),
  })

export type FormSchema = z.infer<typeof formSchema>