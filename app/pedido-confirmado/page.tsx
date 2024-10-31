// app/pedido-confirmado/page.tsx
'use client';

import { useSearchParams, useRouter } from 'next/navigation';

export default function PedidoConfirmado() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('orderId');

  return (
    <div className="max-w-md mx-auto px-4 py-8 text-center">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        ¡Pedido Confirmado!
      </h1>
      <p className="text-gray-700">
        Gracias por tu compra. Hemos recibido tu pedido y estamos trabajando en él.
      </p>
      {orderId && (
        <p className="text-gray-700 mt-4">
          Tu número de pedido es: <span className="font-semibold">{orderId}</span>
        </p>
      )}
      <button
        onClick={() => router.push('/')}
        className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Volver al Inicio
      </button>
    </div>
  );
}
