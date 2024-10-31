import { Plus, MapPin, Phone, Mail } from 'lucide-react';

export default function Branches() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Gestión de Sucursales</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Sucursal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            name: 'Sucursal Centro',
            address: 'Av. Principal 123',
            phone: '+54 11 4567-8900',
            email: 'centro@pizzahub.com',
            manager: 'Juan Pérez',
            employees: 12,
            status: 'Abierto'
          },
          {
            name: 'Sucursal Norte',
            address: 'Calle Norte 456',
            phone: '+54 11 4567-8901',
            email: 'norte@pizzahub.com',
            manager: 'Ana López',
            employees: 8,
            status: 'Abierto'
          },
          {
            name: 'Sucursal Sur',
            address: 'Av. Sur 789',
            phone: '+54 11 4567-8902',
            email: 'sur@pizzahub.com',
            manager: 'Carlos Rodríguez',
            employees: 10,
            status: 'Cerrado'
          }
        ].map((branch) => (
          <div key={branch.name} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{branch.name}</h3>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  branch.status === 'Abierto'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {branch.status}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <span className="ml-2 text-sm text-gray-600">{branch.address}</span>
                </div>
                
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="ml-2 text-sm text-gray-600">{branch.phone}</span>
                </div>
                
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="ml-2 text-sm text-gray-600">{branch.email}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-500">Gerente</span>
                  <span className="text-sm text-gray-900">{branch.manager}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Empleados</span>
                  <span className="text-sm text-gray-900">{branch.employees}</span>
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <button className="flex-1 text-sm px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                  Editar
                </button>
                <button className="flex-1 text-sm px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                  Ver Detalles
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}