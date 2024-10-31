// app/checkout/page.tsx
'use client';

import { useContext, useState } from 'react';
import { CartContext } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase'; // Asegúrate de que la ruta es correcta
import 'react-toastify/dist/ReactToastify.css';

export default function CheckoutPage() {
  const { cart, clearCart } = useContext(CartContext)!;
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'Efectivo',
    cashAmount: '',
    deliveryMethod: 'Envío a Domicilio',
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validación básica
    if (cart.length === 0) {
      alert('El carrito está vacío.');
      return;
    }

    if (formData.paymentMethod === 'Efectivo' && !formData.cashAmount) {
      alert('Por favor, ingresa con cuánto vas a pagar.');
      return;
    }

    if (
      formData.deliveryMethod === 'Envío a Domicilio' &&
      formData.address.trim() === ''
    ) {
      alert('Por favor, ingresa tu dirección.');
      return;
    }

    // Crear el objeto del pedido
    const orderData = {
      customer: {
        name: formData.name,
        phone: formData.phone,
        address:
          formData.deliveryMethod === 'Envío a Domicilio'
            ? formData.address
            : 'Retiro en Local',
      },
      items: cart,
      total: total + 500, // Incluyendo envío
      paymentMethod: formData.paymentMethod,
      cashAmount:
        formData.paymentMethod === 'Efectivo'
          ? Number(formData.cashAmount)
          : null,
      deliveryMethod: formData.deliveryMethod,
      status: 'pending',
      time: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 30 * 60000).toISOString(), // +30 minutos
    };

    try {
      // Agregar el pedido a la colección "orders" en Firestore
      const docRef = await addDoc(collection(db, 'orders'), orderData);
      console.log('Pedido enviado con ID:', docRef.id);

      // Limpiar el carrito y redirigir al usuario
      clearCart();
      router.push(`/pedido-confirmado?orderId=${docRef.id}`)
    } catch (error) {
      console.error('Error al enviar el pedido:', error);
      alert('Hubo un error al procesar tu pedido. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Finalizar Pedido
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Resumen del Pedido */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Tu Pedido
          </h2>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span className="text-sm text-gray-700">
                  {item.quantity} x {item.name}
                </span>
                <span className="text-sm text-gray-900">
                  ${(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">Subtotal</span>
                <span className="text-gray-900">${total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">Envío</span>
                <span className="text-gray-900">$500</span>
              </div>
              <div className="flex justify-between font-semibold mt-2">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">
                  ${(total + 500).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario de Datos Personales */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Datos Personales
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Teléfono
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="deliveryMethod"
                className="block text-sm font-medium text-gray-700"
              >
                Método de Entrega
              </label>
              <select
                name="deliveryMethod"
                id="deliveryMethod"
                value={formData.deliveryMethod}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
              >
                <option value="Envío a Domicilio">Envío a Domicilio</option>
                <option value="Retiro en Local">Retiro en Local</option>
              </select>
            </div>
            {formData.deliveryMethod === 'Envío a Domicilio' && (
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Dirección
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                />
              </div>
            )}
            <div>
              <label
                htmlFor="paymentMethod"
                className="block text-sm font-medium text-gray-700"
              >
                Método de Pago
              </label>
              <select
                name="paymentMethod"
                id="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
              >
                <option value="Efectivo">Efectivo</option>
                <option value="Tarjeta">Tarjeta</option>
                <option value="Mercado Pago">Mercado Pago</option>
              </select>
            </div>
            {formData.paymentMethod === 'Efectivo' && (
              <div>
                <label
                  htmlFor="cashAmount"
                  className="block text-sm font-medium text-gray-700"
                >
                  ¿Con cuánto vas a pagar?
                </label>
                <input
                  type="number"
                  name="cashAmount"
                  id="cashAmount"
                  required
                  min={total + 500}
                  value={formData.cashAmount}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full mt-4 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Confirmar Pedido
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
