import { Router } from "express"; // Importa Router de Express para crear rutas
import { createPurchase, disablePurchase, enablePurchase, getAllPurchasesForProduct, getAllPurchasesForProvider, updatePurchase } from "../controllers/purchases.controller.js"; // Importa los controladores para manejar las solicitudes relacionadas con compras
import { authRequiredAdmin } from "../middlewares/validateTokenAdmin.js"; // Importa el middleware de autenticación para administradores
import { authRequiredAllUsers } from "../middlewares/validateTokenAllUsers.js"; // Importa el middleware de autenticación para todos los usuarios

const router = new Router(); // Crea una nueva instancia de Router

// Define las rutas y aplica el middleware de autenticación donde sea necesario
router.post('/', authRequiredAdmin, createPurchase); // Ruta para crear una nueva compra, requiere autenticación de administrador
router.get('/provider/:idProvider', authRequiredAllUsers, getAllPurchasesForProvider); // Ruta para obtener todas las compras de un proveedor, requiere autenticación de cualquier usuario
router.get('/product/:idProduct', authRequiredAllUsers, getAllPurchasesForProduct); // Ruta para obtener todas las compras de un producto, requiere autenticación de cualquier usuario
router.put('/:id', authRequiredAdmin, updatePurchase); // Ruta para actualizar una compra existente, requiere autenticación de administrador
router.put('/disable/:id', authRequiredAdmin, disablePurchase); // Ruta para deshabilitar una compra, requiere autenticación de administrador
router.put('/enable/:id', authRequiredAdmin, enablePurchase); // Ruta para habilitar una compra, requiere autenticación de administrador

export default router; // Exporta el router para su uso en otros módulos