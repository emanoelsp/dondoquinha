"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { User, Search, ShoppingCart, Menu, ArrowDownAZ, X } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import LoginComponent from "../components/login"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const router = useRouter()
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 100)
      }

      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchExpanded])

  const handleNavClick = (
    item: "Início" | "Coleção" | "Acessórios" | "Outlet" | "Kits" | "Avaliações" | "Contatos",
  ) => {
    switch (item) {
      case "Início":
        router.push("/")
        break
      case "Coleção":
        router.push("/produtos")
        break
      case "Acessórios":
        router.push("/produtos?acessorios=true")
        break
      case "Outlet":
        router.push("/produtos?promocao=true")
        break
      case "Kits":
        router.push("/produtos?kits=true")
        break
      case "Avaliações":
        router.push("/avaliacoes")
        break
      case "Contatos":
        router.push("/contatos")
        break
      default:
        router.push(`/${item}`)
    }
  }

  const handleLoginClick = () => {
    setIsLoginOpen(true)
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const searchTerm = searchInputRef.current?.value
    if (searchTerm) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
      setIsSearchExpanded(false)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-pink-100 to-pink-200 text-pink-800 shadow-lg transition-all duration-300">
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="container mx-auto"
          >
            <div className="flex justify-between items-center mt-2 text-sm">
              <div>
                Frete <label className="bg-green-100 p-1 animate-pulse-text"> grátis</label> na primeira compra |
                Compras acima de R$100 até <label className="bg-yellow-100 p-1 animate-pulse-text"> 5X sem juros</label>
              </div>
              <div className="flex items-center space-x-4">
                <motion.div
                  className="flex items-center space-x-4"
                  animate={{ x: isSearchExpanded ? -200 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    onClick={handleLoginClick}
                    className="flex items-center hover:text-pink-600 transition-colors whitespace-nowrap"
                  >
                    <User className="w-4 h-4 mr-1" />
                    Entrar
                  </button>
                  <span className="text-pink-600">|</span>
                  <Link
                    href="/clientes/cadastro"
                    className="flex items-center hover:text-pink-600 transition-colors whitespace-nowrap"
                  >
                    <ArrowDownAZ className="w-4 h-4 mr-1" />
                    Cadastrar
                  </Link>
                  <span className="text-pink-600">|</span>
                </motion.div>
                
                <div
                  className="relative flex items-center"
                  onMouseEnter={() => setIsSearchExpanded(true)}
                  onMouseLeave={() => setIsSearchExpanded(false)}
                >
                  <Search className="w-4 h-4 cursor-pointer hover:text-pink-600 transition-colors mr-1" />
                  <span
                    className={`cursor-pointer hover:text-pink-600 transition-colors ${isSearchExpanded ? "opacity-0" : "opacity-100"}`}
                  >
                    Pesquisar
                  </span>
                  <AnimatePresence>
                    {isSearchExpanded && (
                      <motion.form
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 200, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2"
                        onSubmit={handleSearch}
                      >
                        <input
                          ref={searchInputRef}
                          type="text"
                          placeholder="Pesquisar..."
                          className="w-full px-3 py-1 rounded-full bg-pink-50 text-pink-800 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
                        />
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="container mx-auto py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold flex items-center">
            <Image src="/imagens/logo.png" alt="Logo" width={140} height={40} className="object-contain" />
          </Link>
          <nav className="hidden md:block">
            <ul className="text-lg flex space-x-6">
              {["Início", "Coleção", "Acessórios", "Outlet", "Kits", "Avaliações", "Contatos"].map((item) => (
                <li key={item}>
                  <button onClick={() => handleNavClick(item as any)} className="hover:text-pink-600 transition-colors">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            <ShoppingCart className="w-6 h-6 cursor-pointer hover:text-pink-600 transition-colors" />
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden focus:outline-none">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
              {["Início", "Coleção", "Acessórios", "Outlet", "Avaliações", "Contatos"].map((item) => (
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
      {isLoginOpen && <LoginComponent onClose={() => setIsLoginOpen(false)} />}
    </header>
  )
}

