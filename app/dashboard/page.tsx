import { Users, Store, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Empleados</p>
              <p className="text-2xl font-semibold text-gray-900">24</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-50 rounded-lg">
              <Store className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Sucursales</p>
              <p className="text-2xl font-semibold text-gray-900">3</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-red-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ventas del Mes</p>
              <p className="text-2xl font-semibold text-gray-900">$45,678</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Sucursales Activas</h2>
          <div className="space-y-4">
            {[
              { name: 'Sucursal Centro', status: 'Abierto', orders: 45 },
              { name: 'Sucursal Norte', status: 'Abierto', orders: 32 },
              { name: 'Sucursal Sur', status: 'Cerrado', orders: 0 },
            ].map((branch) => (
              <div key={branch.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{branch.name}</p>
                  <p className={`text-sm ${
                    branch.status === 'Abierto' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {branch.status}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Pedidos Hoy</p>
                  <p className="font-semibold text-gray-900">{branch.orders}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Empleados Recientes</h2>
          <div className="space-y-4">
            {[
              { name: 'Ana García', role: 'Cajero', branch: 'Sucursal Centro' },
              { name: 'Carlos López', role: 'Cocinero', branch: 'Sucursal Norte' },
              { name: 'María Rodríguez', role: 'Mesero', branch: 'Sucursal Sur' },
            ].map((employee) => (
              <div key={employee.name} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="h-10 w-10 rounded-full bg-red-500 flex items-center justify-center text-white font-semibold">
                  {employee.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{employee.name}</p>
                  <p className="text-sm text-gray-600">{employee.role} - {employee.branch}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}