'use client'

import { useState } from 'react';
import { X } from 'lucide-react';

interface LoginComponentProps {
  onClose: () => void;
}

export default function LoginComponent({ onClose }: LoginComponentProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement login logic here
    console.log('Login attempt with:', email, password);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full flex overflow-hidden">
        {/* Left section */}
        <div className="bg-pink-500 text-white p-8 flex-1">
          <h2 className="text-3xl font-bold mb-6">Bem-vindo</h2>
          <div className="space-y-4">
            <p className="text-lg">Que bom ter você aqui!</p>
            <p>Entre para acessar sua conta e aproveitar todos os nossos produtos incríveis.</p>

            <p> Não tem uma conta ainda? Cadastre-se agora e comece sua jornada conosco!</p>
          </div>
        </div>

        {/* Right section */}
        <div className="bg-white p-8 flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-pink-800">Entrar</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Entrar
              </button>
            </div>
          </form>
          <div className="mt-4 text-center space-y-2">
            <a href="#" className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-pink-600 bg-white border border-pink-500 hover:bg-pink-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-200">

              Cadastrar
            </a>
            <a href="#" className="block text-sm text-pink-600 hover:text-pink-500">
              Esqueceu sua senha?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}