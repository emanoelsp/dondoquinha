'use client'

import { useState } from 'react'
import {
  BarChart,
  Bell,
  Box,
  ChevronDown,
  DollarSign,
  LineChart,
  Package,
  Search,
  ShoppingBag,
  ShoppingCart,
  Tag,
  Truck,
  Users,
} from 'lucide-react'
import VisaoGeral from './visaogeral'
import ListaProdutos from '../produtos/listaprodutos'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="flex h-screen bg-gray-100 mt-36">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-pink-600">GESTOR  <br />  e-commerce</h1>
        </div>
        <nav className="mt-6">
          {['Visão Geral', 'Pedidos', 'Produtos', 'Clientes'].map((tab) => (
            <button
              key={tab}
              className={`w-full flex items-center px-4 py-2 text-left ${
                activeTab === tab ? 'bg-pink-100 text-pink-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'Visão Geral' && <LineChart className="mr-2 h-4 w-4" />}
              {tab === 'Pedidos' && <ShoppingBag className="mr-2 h-4 w-4" />}
              {tab === 'Produtos' && <Box className="mr-2 h-4 w-4" />}
              {tab === 'Clientes' && <Users className="mr-2 h-4 w-4" />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Painel de controle</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Pesquisar..."
                className="w-64 pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
              <Bell className="h-5 w-5 text-gray-600" />
            </button>
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex space-x-2 border-b">
            {['Visão Geral', 'Pedidos', 'Produtos', 'Clientes'].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 ${
                  activeTab === tab
                    ? 'border-b-2 border-pink-500 text-pink-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'Visão Geral' && (
          <VisaoGeral />
        )}

        {activeTab === 'Pedidos' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Pedidos Recentes</h3>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center p-4 border rounded-lg">
                  <div className="w-16 h-16 bg-pink-100 rounded-md mr-4"></div>
                  <div className="flex-1">
                    <p className="font-medium">Pedido #{1000 + i}</p>
                    <p className="text-sm text-gray-500">Cliente: João Silva</p>
                    <p className="text-sm text-gray-500">Status: Em processamento</p>
                  </div>
                  <button className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600">
                    <Truck className="inline-block mr-2 h-4 w-4" />
                    Detalhes
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Produtos' && (
            <ListaProdutos />
        )}

        {activeTab === 'Clientes' && (
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { title: 'Novos Clientes', value: '+1,234', change: '+10%' },
                { title: 'Clientes Recorrentes', value: '5,678', change: '+5%' },
                { title: 'Clientes Inativos', value: '789', change: '-2%' },
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-500">{item.title}</h3>
                    <Users className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="text-2xl font-bold">{item.value}</div>
                  <p className={`text-sm ${item.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {item.change} em relação ao mês anterior
                  </p>
                </div>
              ))}
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Segmentação de Clientes</h3>
              <div className="space-y-4">
                {['Idade', 'Localização', 'Frequência de Compra'].map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span>{category}</span>
                    <button className="text-pink-500 hover:text-pink-600">
                      Ver detalhes
                      <ChevronDown className="inline-block ml-1 h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}