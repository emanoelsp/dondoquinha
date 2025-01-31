import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { FormSchema } from "../utilitarios/validacampos";
import { maskCPF, maskPhone } from "../utilitarios/mascaras";

interface PersonalInfoFormProps {
  register: UseFormRegister<FormSchema>;
  errors: FieldErrors<FormSchema>;
  emailValid: boolean;
  emailMessage: string;
  handleCpfBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  handleEmailBlur: (event: React.FocusEvent<HTMLInputElement>) => void; // Nova prop
  submitMessage: string;
  cpfMessageClass: string;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  register,
  errors,
  emailValid,
  emailMessage,
  handleCpfBlur,
  handleEmailBlur,
  submitMessage,
  cpfMessageClass,
}) => {
  return (
    <>
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          Nome Completo
        </label>
        <input
          id="fullName"
          {...register("fullName")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-blue-500"
        />
        {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          {...register("email")}
          onBlur={handleEmailBlur} // Adicionando a função de validação no blur
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.email ? "border-red-500" : emailValid ? "border-gray-300" : "border-red-500"
          } rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-blue-500`}
        />
        {emailMessage && (
          <p
            className={`mt-1 text-sm p-2 rounded ${
              emailValid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {emailMessage}
          </p>
        )}
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">
          CPF
        </label>
        <input
          id="cpf"
          {...register("cpf")}
          onBlur={handleCpfBlur}
          onChange={(e) => {
            e.target.value = maskCPF(e.target.value);
            register("cpf").onChange(e);
          }}
          className={`mt-1 block w-full px-3 py-2 border ${
            cpfMessageClass.includes("bg-red-100") ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-blue-500`}
        />
        {errors.cpf && <p className="mt-1 text-sm text-red-600">{errors.cpf.message}</p>}
        {submitMessage && submitMessage.includes("CPF") && (
          <div className={`mt-2 text-sm p-2 rounded ${cpfMessageClass}`}>{submitMessage}</div>
        )}
      </div>

      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
          Telefone
        </label>
        <input
          id="phoneNumber"
          {...register("phoneNumber")}
          onChange={(e) => {
            e.target.value = maskPhone(e.target.value);
            register("phoneNumber").onChange(e);
          }}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-blue-500"
        />
        {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>}
      </div>
    </>
  );
};