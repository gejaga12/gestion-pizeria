// app/dashboard/pedidos/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Search, Clock, MapPin, Phone,
  AlertCircle, CheckCircle2, XCircle, ChevronDown, ChevronUp
} from 'lucide-react';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Asegúrate de que la ruta es correcta
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FaWhatsapp } from 'react-icons/fa';

interface Order {
  id: string;
  customer: {
    name: string;
    address: string;
    phone: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: string;
  branch?: string;
  time: string;
  estimatedDelivery: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const loadedOrderIds = useRef(new Set<string>());

  // Listener para notificaciones de nuevos pedidos
  useEffect(() => {
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const newOrder = change.doc.data() as Order;
          if (!loadedOrderIds.current.has(change.doc.id)) {
            loadedOrderIds.current.add(change.doc.id);
            toast.success(`Nuevo pedido recibido de ${newOrder.customer.name}`, {
              position: 'top-right',
              autoClose: 5000,
            });
          }
        }
      });
    });

    return () => unsubscribe();
  }, []);

  // Listener para actualizar la lista de pedidos según el filtro
  useEffect(() => {
    setLoading(true);

    const ordersRef = collection(db, 'orders');
    let q = ordersRef;

    if (filterStatus !== 'all') {
      q = query(ordersRef, where('status', '==', filterStatus));
    }

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ordersData = querySnapshot.docs.map(doc => {
        const data = doc.data() as Order;
        return {
          id: doc.id,
          ...data,
        };
      });

      // Ordenar los pedidos por fecha, el más reciente primero
      ordersData.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

      setOrders(ordersData);
      setLoading(false);
    }, (error) => {
      console.error('Error al obtener los pedidos:', error);
      setError('Error al obtener los pedidos');
      setLoading(false);
    });

    // Limpieza al desmontar el componente
    return () => unsubscribe();
  }, [filterStatus]);

  return (
    <div className="space-y-6">
      {/* Contenedor de las notificaciones */}
      <ToastContainer />

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Gestión de Pedidos</h1>
      </div>

      {/* Filtros y Búsqueda */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm"
                placeholder="Buscar pedidos..."
                // Implementa la lógica de búsqueda si lo deseas
              />
            </div>
            <div className="flex items-center gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
              >
                <option value="all">Todos los estados</option>
                <option value="pending">Pendientes</option>
                <option value="preparing">En preparación</option>
                <option value="ready">Listos</option>
                <option value="delivered">Entregados</option>
                <option value="cancelled">Cancelados</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Manejo de estados */}
      {loading ? (
        <p>Cargando pedidos...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : orders.length === 0 ? (
        <p>No hay pedidos para mostrar.</p>
      ) : (
        /* Lista de pedidos */
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}

// Componente para cada tarjeta de pedido
function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);

  // Función para actualizar el estado del pedido
  const handleStatusChange = async (newStatus: string) => {
    try {
      const orderRef = doc(db, 'orders', order.id);
      await updateDoc(orderRef, { status: newStatus });
      console.log(`Pedido ${order.id} actualizado a ${newStatus}`);
    } catch (error) {
      console.error('Error al actualizar el pedido:', error);
      alert('Hubo un error al actualizar el pedido.');
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <span className="text-lg font-semibold text-gray-900">
              Pedido #{order.id}
            </span>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
              order.status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : order.status === 'preparing'
                ? 'bg-blue-100 text-blue-800'
                : order.status === 'ready'
                ? 'bg-green-100 text-green-800'
                : order.status === 'delivered'
                ? 'bg-gray-100 text-gray-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {order.status === 'pending' ? 'Pendiente' 
                : order.status === 'preparing' ? 'En Preparación'
                : order.status === 'ready' ? 'Listo'
                : order.status === 'delivered' ? 'Entregado'
                : 'Cancelado'}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            {new Date(order.time).toLocaleTimeString()}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Información del Cliente</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-900">{order.customer.name}</p>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                {order.customer.address}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                {order.customer.phone}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Detalles del Pedido</h3>
            <div className="space-y-2">
              {(expanded ? order.items : order.items.slice(0, 2)).map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="text-gray-900">
                    ${(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
              {order.items.length > 2 && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center text-sm text-red-600 hover:text-red-800 focus:outline-none mt-2"
                >
                  {expanded ? (
                    <>
                      Mostrar menos <ChevronUp className="w-4 h-4 ml-1" />
                    </>
                  ) : (
                    <>
                      Mostrar más <ChevronDown className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>
              )}
              <div className="pt-2 border-t border-gray-200">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">
                    ${order.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between pt-6 border-t border-gray-200">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            {/* Botones para actualizar el estado del pedido */}
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="block pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
            >
              <option value="pending">Pendiente</option>
              <option value="preparing">En preparación</option>
              <option value="ready">Listo</option>
              <option value="delivered">Entregado</option>
              <option value="cancelled">Cancelado</option>
            </select>
            <button
              onClick={() => handleStatusChange('cancelled')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Cancelar Pedido
            </button>
            {/* Botón de WhatsApp */}
            <a
              href={`https://wa.me/${formatPhoneNumber(order.customer.phone)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <FaWhatsapp className="w-4 h-4 mr-2" />
              WhatsApp
            </a>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <AlertCircle className="w-4 h-4 mr-1" />
            Entrega estimada: {new Date(order.estimatedDelivery).toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
}

// Función para formatear el número de teléfono para WhatsApp
function formatPhoneNumber(phone: string): string {
  // Remover cualquier carácter que no sea dígito
  return phone.replace(/\D/g, '');
}
