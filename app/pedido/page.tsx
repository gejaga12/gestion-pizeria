'use client';

import { useState, useContext } from 'react';
import { pizzaMenu, bebidas, PizzaSize, PizzaType } from '../data/menu';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { CartContext } from '@/context/CartContext';
import { CartItem } from '@/types/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


export default function OrderPage() {
  const { cart, addToCart, updateQuantity, removeItem } = useContext(CartContext)!;
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('Mediana');
  const [selectedType, setSelectedType] = useState<PizzaType>('Entera');
  const router = useRouter();

  const handleAddPizzaToCart = (pizza: typeof pizzaMenu[0]) => {
    const price =
      selectedType === 'Mitad' ? pizza.price[selectedSize] / 2 : pizza.price[selectedSize];

    const newItem: CartItem = {
      id: `${pizza.id}-${selectedSize}-${selectedType}-${Date.now()}`,
      name: `Pizza ${pizza.name} ${selectedSize} ${
        selectedType === 'Mitad' ? '(Mitad)' : ''
      }`,
      size: selectedSize,
      type: selectedType,
      quantity: 1,
      price,
    };

    addToCart(newItem);
  };

  const handleAddBebidaToCart = (bebida: typeof bebidas[0]) => {
    const newItem: CartItem = {
      id: `${bebida.id}-${Date.now()}`,
      name: `${bebida.name} ${bebida.size}`,
      quantity: 1,
      price: bebida.price,
    };

    addToCart(newItem);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Pizzas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tamaño
                  </label>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value as PizzaSize)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  >
                    <option value="Personal">Personal</option>
                    <option value="Mediana">Mediana</option>
                    <option value="Grande">Grande</option>
                    <option value="Familiar">Familiar</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value as PizzaType)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  >
                    <option value="Entera">Pizza Entera</option>
                    <option value="Mitad">Media Pizza</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pizzaMenu.map((pizza) => (
                  <div key={pizza.id} className="border rounded-lg p-4">
                            
                <Image
                  src={pizza.image}
                  alt={pizza.name}
                  width={48} // optional: set the width of the image
                  height={48} // optional: set the height of the image
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                    <h3 className="text-lg font-medium text-gray-900">{pizza.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{pizza.description}</p>
                    <p className="text-lg font-semibold text-gray-900 mb-3">
                      $
                      {selectedType === 'Mitad'
                        ? (pizza.price[selectedSize] / 2).toLocaleString()
                        : pizza.price[selectedSize].toLocaleString()}
                    </p>
                    <button
                      onClick={() => handleAddPizzaToCart(pizza)}
                      className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Agregar al Pedido
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Bebidas</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {bebidas.map((bebida) => (
                  <div key={bebida.id} className="border rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900">{bebida.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{bebida.size}</p>
                    <p className="text-lg font-semibold text-gray-900 mb-3">
                      ${bebida.price.toLocaleString()}
                    </p>
                    <button
                      onClick={() => handleAddBebidaToCart(bebida)}
                      className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Agregar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cart Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Tu Pedido</h2>
                <ShoppingCart className="w-6 h-6 text-gray-400" />
              </div>

              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-6">Tu carrito está vacío</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-2 border-b"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          ${(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, false)}
                          className="p-1 text-gray-400 hover:text-gray-500"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-gray-600">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, true)}
                          className="p-1 text-gray-400 hover:text-gray-500"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 text-red-400 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-900">Subtotal</span>
                      <span className="text-gray-900">${total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-4">
                      <span className="font-medium text-gray-900">Envío</span>
                      <span className="text-gray-900">$500</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">
                        ${(total + 500).toLocaleString()}
                      </span>
                    </div>
                  </div>

                 <button
  onClick={() => router.push('/checkout')}
  className="w-full mt-6 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
>
  Continuar con el Pedido
</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
