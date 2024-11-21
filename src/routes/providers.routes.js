import { Router } from "express"; // Importa Router de Express para crear rutas
import { createProvider, createProviderContact, disableProvider, disableProviderContact, enableProvider, getProvider, getProviderContacts, getProviders, searchProviderForName, updateProvider, updateProviderContact } from "../controllers/providers.controller.js"; // Importa los controladores para manejar las solicitudes relacionadas con proveedores
import { authRequiredAdmin } from "../middlewares/validateTokenAdmin.js"; // Importa el middleware de autenticación para administradores
import { authRequiredAllUsers } from "../middlewares/validateTokenAllUsers.js"; // Importa el middleware de autenticación para todos los usuarios

const router = new Router(); // Crea una nueva instancia de Router

// Define las rutas y aplica el middleware de autenticación donde sea necesario
router.post('/', authRequiredAdmin, createProvider); // Ruta para crear un nuevo proveedor, requiere autenticación de administrador
router.post('/contact', authRequiredAdmin, createProviderContact); // Ruta para crear un nuevo contacto de proveedor, requiere autenticación de administrador
router.get('/', authRequiredAllUsers, getProviders); // Ruta para obtener todos los proveedores, requiere autenticación de cualquier usuario
router.get('/provider/:id', authRequiredAllUsers, getProvider); // Ruta para obtener un proveedor por su ID, requiere autenticación de cualquier usuario
router.get('/contacts/:idProvider', authRequiredAllUsers, getProviderContacts); // Ruta para obtener los contactos de un proveedor, requiere autenticación de cualquier usuario
router.get('/search/:name', authRequiredAllUsers, searchProviderForName); // Ruta para buscar proveedores por nombre, requiere autenticación de cualquier usuario
router.put('/:id', authRequiredAdmin, updateProvider); // Ruta para actualizar un proveedor existente, requiere autenticación de administrador
router.put('/contact/:id', authRequiredAdmin, updateProviderContact); // Ruta para actualizar un contacto de proveedor existente, requiere autenticación de administrador
router.put('/disable/:id', authRequiredAdmin, disableProvider); // Ruta para deshabilitar un proveedor, requiere autenticación de administrador
router.put('/enable/:id', authRequiredAdmin, enableProvider); // Ruta para habilitar un proveedor, requiere autenticación de administrador
router.put('/contact/disable/:id', authRequiredAdmin, disableProviderContact); // Ruta para deshabilitar un contacto de proveedor, requiere autenticación de administrador

export default router; // Exporta el router para su uso en otros módulos