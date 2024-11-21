import Router from 'express'; // Importa Router de Express para crear rutas
import { getAllHistoryProducts, getAllHistoryProviders, getAllHistoryPurchases, moreDetailsHistoryProduct, moreDetailsHistoryProvider, moreDetailsHistoryPurchase, searchInHistoryProductsForNameProductUserDate, searchInHistoryProvidersForNameProviderUserDate, searchInHistoryPurchasesForNameProductUserDate } from "../controllers/historys.controller.js"; // Importa los controladores para manejar las solicitudes relacionadas con el historial
import { authRequiredAdmin } from "../middlewares/validateTokenAdmin.js"; // Importa el middleware de autenticación para administradores

const router = new Router(); // Crea una nueva instancia de Router

// Define las rutas y aplica el middleware de autenticación para administradores donde sea necesario
router.get('/products', authRequiredAdmin, getAllHistoryProducts); // Ruta para obtener todo el historial de productos, requiere autenticación de administrador
router.get('/providers', authRequiredAdmin, getAllHistoryProviders); // Ruta para obtener todo el historial de proveedores, requiere autenticación de administrador
router.get('/purchases', authRequiredAdmin, getAllHistoryPurchases); // Ruta para obtener todo el historial de compras, requiere autenticación de administrador
router.get('/products/:id', authRequiredAdmin, moreDetailsHistoryProduct); // Ruta para obtener más detalles de un producto en el historial por su ID, requiere autenticación de administrador
router.get('/providers/:id', authRequiredAdmin, moreDetailsHistoryProvider); // Ruta para obtener más detalles de un proveedor en el historial por su ID, requiere autenticación de administrador
router.get('/purchases/:id', authRequiredAdmin, moreDetailsHistoryPurchase); // Ruta para obtener más detalles de una compra en el historial por su ID, requiere autenticación de administrador
router.post('/products/search', authRequiredAdmin, searchInHistoryProductsForNameProductUserDate); // Ruta para buscar en el historial de productos por nombre, usuario y fecha, requiere autenticación de administrador
router.post('/providers/search', authRequiredAdmin, searchInHistoryProvidersForNameProviderUserDate); // Ruta para buscar en el historial de proveedores por nombre, usuario y fecha, requiere autenticación de administrador
router.post('/purchases/search', authRequiredAdmin, searchInHistoryPurchasesForNameProductUserDate); // Ruta para buscar en el historial de compras por nombre de producto, usuario y fecha, requiere autenticación de administrador

export default router; // Exporta el router para su uso en otros módulos