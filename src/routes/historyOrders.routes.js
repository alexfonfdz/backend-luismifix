import { Router } from 'express'; // Importa Router de Express para crear rutas
import { getPurchaseHistoryByUser, getAllPurchaseHistories, addToCart, getCart, updateCart, removeFromCart, calculateTotalPrice, createCheckoutSession, handleWebhook } from '../controllers/historyOrders.controller.js'; // Importa los controladores para manejar las solicitudes relacionadas con el historial de órdenes de compra
import { authRequiredAllUsers } from '../middlewares/validateTokenAllUsers.js'; // Importa el middleware de autenticación para todos los usuarios
import { authRequiredAdmin } from '../middlewares/validateTokenAdmin.js'; // Importa el middleware de autenticación para administradores

const router = new Router(); // Crea una nueva instancia de Router

// Define las rutas y aplica el middleware de autenticación donde sea necesario
router.get('/user/:userId', authRequiredAllUsers, getPurchaseHistoryByUser); // Ruta para obtener el historial de compras de un usuario, requiere autenticación de cualquier usuario
router.get('/all', authRequiredAdmin, getAllPurchaseHistories); // Ruta para obtener todos los historiales de compras, requiere autenticación de administrador
router.post('/add', authRequiredAllUsers, addToCart); // Ruta para agregar un producto al carrito, requiere autenticación de cualquier usuario
router.get('/cart/:userId', authRequiredAllUsers, getCart); // Ruta para obtener el carrito de un usuario, requiere autenticación de cualquier usuario
router.put('/update', authRequiredAllUsers, updateCart); // Ruta para actualizar el carrito, requiere autenticación de cualquier usuario
router.delete('/remove', authRequiredAllUsers, removeFromCart); // Ruta para eliminar un producto del carrito, requiere autenticación de cualquier usuario
router.get('/total/:userId', authRequiredAllUsers, calculateTotalPrice); // Ruta para calcular el precio total del carrito, requiere autenticación de cualquier usuario
router.post('/create-checkout-session', authRequiredAllUsers, createCheckoutSession); // Ruta para crear una sesión de pago, requiere autenticación de cualquier usuario
router.post('/webhook', handleWebhook); // Ruta para manejar los webhooks de Stripe

export default router; // Exporta el router para su uso en otros módulos