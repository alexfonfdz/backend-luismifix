import { Router } from 'express'; // Importa Router de Express para crear rutas
import { uploadImage, getImagesByProduct } from '../controllers/imageProduct.controller.js'; // Importa los controladores para manejar las solicitudes relacionadas con imágenes de productos
import { authRequiredAdmin } from "../middlewares/validateTokenAdmin.js"; // Importa el middleware de autenticación para administradores
import { upload } from '../middlewares/uploadImage.js'; // Importa el middleware para manejar la subida de imágenes

const router = new Router(); // Crea una nueva instancia de Router

// Define las rutas y aplica el middleware de autenticación y de subida de imágenes donde sea necesario
router.post('/upload/:idProduct/:idUser', authRequiredAdmin, upload.single('productImage'), uploadImage); // Ruta para subir una imagen de producto, requiere autenticación de administrador y manejo de subida de imágenes
router.get('/product/:idProduct', getImagesByProduct); // Ruta para obtener las imágenes de un producto por su ID, no requiere autenticación

export default router; // Exporta el router para su uso en otros módulos