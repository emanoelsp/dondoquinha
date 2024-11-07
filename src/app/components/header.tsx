'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, Search, ShoppingCart, Menu } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = typeof window !== 'undefined' ? useRouter() : null; // Garante que useRouter só é chamado no lado do cliente

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (item: 'Início' | 'Coleção' | 'Categorias' | 'Outlet' | 'Kits' | 'Avaliações' | 'Contatos') => {
    if (router) {
      if (item === 'Início') {
        router.push('/');
      } else 
      if (item === 'Coleção') {
        router.push('/produtos');
      } else 
      if (item === 'Categorias') {
        router.push('/produtos?categoria=true');
      } else if (item === 'Outlet') {
        router.push('/produtos?promocao=true');
      } else if (item === 'Kits') {
        router.push('/produtos?kits=true');
      } else if (item === 'Contatos') {
        document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        router.push(`/${item.toLowerCase()}`);
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-pink-100 to-pink-200 text-pink-800 shadow-lg transition-all duration-300">
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="container mx-auto"
          >
            <div className="flex justify-between items-center mt-2 text-sm">
              <div>Frete grátis na primeira compra | Compras acima de R$100 até 5x sem juros</div>
              <div className="flex items-center space-x-4">
                <User className="w-4 h-4 mr-1" />
                <Link href="/login" className="flex items-center hover:text-pink-600 transition-colors">
                  Entrar
                </Link>
                |
                <Link href="/clientes" className="flex items-center hover:text-pink-600 transition-colors">
                  Cadastrar
                </Link>
                <Search className="w-5 h-5 cursor-pointer hover:text-pink-600 transition-colors" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="container mx-auto py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold flex items-center">
            <Image
              src="/imagens/logo.png"
              alt="Logo"
              width={140}
              height={40}
              className="object-contain"
            />
          </Link>
          <nav className="hidden md:block">
            <ul className="text-lg flex space-x-6">
              {['Início', 'Coleção', 'Categorias', 'Outlet', 'Kits', 'Avaliações', 'Contatos'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => handleNavClick(item as any)}
                    className="hover:text-pink-600 transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            <ShoppingCart className="w-6 h-6 cursor-pointer hover:text-pink-600 transition-colors" />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden focus:outline-none"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-pink-100 py-4"
          >
            <ul className="container mx-auto space-y-2">
              {['Início', 'Coleção', 'Categorias', 'Outlet', 'Avaliações', 'Contatos'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="block py-2 px-4 hover:bg-pink-200 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
