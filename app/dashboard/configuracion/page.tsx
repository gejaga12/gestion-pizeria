import { Save, Bell, Lock, Globe, Printer } from 'lucide-react';

export default function Configuration() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Configuración</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* General Settings */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Configuración General</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="company-name" className="block text-sm font-medium text-gray-700">
                    Nombre de la Empresa
                  </label>
                  <input
                    type="text"
                    id="company-name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    defaultValue="PizzaHub"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700">
                    Email de Contacto
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    defaultValue="contacto@pizzahub.com"
                  />
                </div>

                <div>
                  <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                    Zona Horaria
                  </label>
                  <select
                    id="timezone"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  >
                    <option>America/Argentina/Buenos_Aires</option>
                    <option>America/Santiago</option>
                    <option>America/Lima</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Notificaciones</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Bell className="w-5 h-5 text-gray-400" />
                    <span className="ml-3 text-sm text-gray-700">Notificaciones por Email</span>
                  </div>
                  <button
                    type="button"
                    className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 bg-red-600"
                    role="switch"
                    aria-checked="true"
                  >
                    <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out"></span>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Printer className="w-5 h-5 text-gray-400" />
                    <span className="ml-3 text-sm text-gray-700">Impresión Automática</span>
                  </div>
                  <button
                    type="button"
                    className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 bg-gray-200"
                    role="switch"
                    aria-checked="false"
                  >
                    <span className="translate-x-0 inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Seguridad</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Lock className="w-5 h-5 text-gray-400" />
                    <span className="ml-3 text-sm text-gray-700">Autenticación de Dos Factores</span>
                  </div>
                  <button
                    type="button"
                    className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 bg-gray-200"
                    role="switch"
                    aria-checked="false"
                  >
                    <span className="translate-x-0 inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out"></span>
                  </button>
                </div>

                <div>
                  <label htmlFor="session-timeout" className="block text-sm font-medium text-gray-700">
                    Tiempo de Inactividad (minutos)
                  </label>
                  <input
                    type="number"
                    id="session-timeout"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    defaultValue="30"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Information */}
        <div className="space-y-6">
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Información del Sistema</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Versión del Sistema</p>
                  <p className="mt-1 text-sm text-gray-900">1.0.0</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Última Actualización</p>
                  <p className="mt-1 text-sm text-gray-900">2024-03-21</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Base de Datos</p>
                  <p className="mt-1 text-sm text-gray-900">PostgreSQL 14.0</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Acciones</h2>
              <div className="space-y-4">
                <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Cambios
                </button>
                <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                  <Globe className="w-4 h-4 mr-2" />
                  Sincronizar Datos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}