import {
    Package,
    Tag,
  } from 'lucide-react'
  
export default function ListaProdutos(){
    return(
        <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-semibold">Gerenciamento de Produtos</h3>
          <div className="space-x-2">
            <button className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600">
              <Package className="inline-block mr-2 h-4 w-4" />
              Adicionar Produto
            </button>
            <button className="px-4 py-2 border border-pink-500 text-pink-500 rounded hover:bg-pink-50">
              <Tag className="inline-block mr-2 h-4 w-4" />
              Gerenciar Categorias
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center p-4 border rounded-lg">
              <div className="w-16 h-16 bg-pink-100 rounded-md mr-4"></div>
              <div className="flex-1">
                <p className="font-medium">Produto {String.fromCharCode(65 + i)}</p>
                <p className="text-sm text-gray-500">Estoque: {20 - i * 2}</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-pink-500 h-2.5 rounded-full"
                    style={{ width: `${(20 - i * 2) * 5}%` }}
                  ></div>
                </div>
              </div>
              <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">
                Editar
              </button>
            </div>
          ))}
        </div>
      </div>
    )
}