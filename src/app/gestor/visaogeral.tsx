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

export default function VisaoGeral(){
    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { title: 'Vendas Totais', icon: DollarSign, value: 'R$ 45.231,89', change: '+20.1%' },
                    { title: 'Novos Clientes', icon: Users, value: '+2350', change: '+180.1%' },
                    { title: 'Pedidos', icon: ShoppingCart, value: '+12,234', change: '+19%' },
                    { title: 'Produtos Vendidos', icon: Package, value: '+573', change: '+201' },
                ].map((item, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-gray-500">{item.title}</h3>
                            <item.icon className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="text-2xl font-bold">{item.value}</div>
                        <p className="text-sm text-green-500">{item.change} em relação ao mês anterior</p>
                    </div>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">Visão Geral de Vendas</h3>
                    <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
                        <BarChart className="h-32 w-32 text-gray-400" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">Produtos Mais Vendidos</h3>
                    <div className="space-y-4">
                        {['Produto A', 'Produto B'].map((product, index) => (
                            <div key={index} className="flex items-center">
                                <div className="w-16 h-16 bg-pink-100 rounded-md mr-4"></div>
                                <div className="flex-1">
                                    <p className="font-medium">{product}</p>
                                    <p className="text-sm text-gray-500">{234 - index * 47} vendas</p>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                        <div
                                            className="bg-pink-500 h-2.5 rounded-full"
                                            style={{ width: `${80 - index * 15}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
