'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Users, Store, Home, ChevronDown, LogOut, 
  Menu, X, Settings, PizzaIcon
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Usuarios', href: '/dashboard/usuarios', icon: Users },
    { name: 'Sucursales', href: '/dashboard/sucursales', icon: Store },
    { name: 'Pedidos', href: '/dashboard/pedidos', icon: PizzaIcon },
    { name: 'Configuración', href: '/dashboard/configuracion', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-40 h-screen transition-transform
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        bg-white border-r border-gray-200 w-64
      `}>
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">PizzaHub</span>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-900"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center px-4 py-2 text-sm rounded-lg
                  ${isActive 
                    ? 'bg-red-50 text-red-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <div className={`lg:ml-64 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 h-16">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className={`lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-900
                ${isSidebarOpen ? 'hidden' : 'block'}
              `}
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex items-center ml-auto">
              <div className="relative">
                <button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                  <span className="sr-only">Abrir menú de usuario</span>
                  <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center text-white">
                    A
                  </div>
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
              </div>
              
              <button className="ml-4 p-2 text-gray-500 hover:text-gray-900">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}