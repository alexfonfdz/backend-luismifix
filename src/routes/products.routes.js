import { Router } from "express"; // Importa Router de Express para crear rutas
import { createProduct, disableProduct, enableProduct, getAllProducts, getProduct, searchProductForName, searchProductsByType, updateProduct } from "../controllers/products.controller.js"; // Importa los controladores para manejar las solicitudes relacionadas con productos
import { authRequiredAdmin } from "../middlewares/validateTokenAdmin.js"; // Importa el middleware de autenticación para administradores
import { authRequiredAllUsers } from "../middlewares/validateTokenAllUsers.js"; // Importa el middleware de autenticación para todos los usuarios

const router = new Router(); // Crea una nueva instancia de Router

// Define las rutas y aplica el middleware de autenticación donde sea necesario
router.post('/', authRequiredAdmin, createProduct); // Ruta para crear un nuevo producto, requiere autenticación de administrador
router.get('/', authRequiredAllUsers, getAllProducts); // Ruta para obtener todos los productos, requiere autenticación de cualquier usuario
router.get('/productsOftype/:idTypeProduct', searchProductsByType); // Ruta para buscar productos por tipo, no requiere autenticación
router.get('/product/:id', authRequiredAllUsers, getProduct); // Ruta para obtener un producto por su ID, requiere autenticación de cualquier usuario
router.get('/search/:name', authRequiredAllUsers, searchProductForName); // Ruta para buscar productos por nombre, requiere autenticación de cualquier usuario
router.put('/:id', authRequiredAdmin, updateProduct); // Ruta para actualizar un producto existente, requiere autenticación de administrador
router.put('/disable/:id', authRequiredAdmin, disableProduct); // Ruta para deshabilitar un producto, requiere autenticación de administrador
router.put('/enable/:id', authRequiredAdmin, enableProduct); // Ruta para habilitar un producto, requiere autenticación de administrador

export default router; // Exporta el router para su uso en otros módulos