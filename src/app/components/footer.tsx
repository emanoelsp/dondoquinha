import Link from 'next/link'
import { Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-pink-500 text-white">
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="text-2xl font-bold">Logo</Link>
          <div className="flex space-x-4">
            <Facebook className="w-6 h-6" />
            <Instagram className="w-6 h-6" />
            <Twitter className="w-6 h-6" />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-2">Mapa do Site</h3>
            <ul className="space-y-1">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/produtos">Produtos</Link></li>
              <li><Link href="/sobre">Sobre</Link></li>
              <li><Link href="/contato">Contato</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Endereço</h3>
            <p>Rua Exemplo, 123</p>
            <p>Cidade - Estado</p>
            <p>CEP: 12345-678</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Contatos</h3>
            <p>Tel: (11) 1234-5678</p>
            <p>Email: contato@exemplo.com</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Mande uma mensagem</h3>
            <form>
              <input type="text" placeholder="Nome" className="w-full p-2 mb-2 text-black" />
              <input type="email" placeholder="Email" className="w-full p-2 mb-2 text-black" />
              <textarea placeholder="Mensagem" className="w-full p-2 mb-2 text-black"></textarea>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Enviar</button>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-pink-600 py-4">
        <div className="container mx-auto text-center">
          © 2023 Sua Empresa. Todos os direitos reservados.
     <br />
            <Link href="/terms" className="hover:underline">Termos de Uso</Link>
            <Link href="/privacy" className="hover:underline">Política de Privacidade</Link>
            <Link href="/cookies" className="hover:underline">Política de Cookies</Link>
          </div>
      </div>
    </footer>
  )
}