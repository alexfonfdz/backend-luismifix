import { Router } from "express"; // Importa Router de Express para crear rutas
import { typesUser, tyoesStatusRepair, typesContact, typesProduct, typesProvider, typesUrgency } from "../controllers/types.controller.js"; // Importa los controladores para manejar las solicitudes
import { authRequiredAdmin } from "../middlewares/validateTokenAdmin.js"; // Importa el middleware de autenticación para administradores

const router = Router(); // Crea una nueva instancia de Router

// Define las rutas y aplica el middleware de autenticación donde sea necesario
router.get("/typesUser", authRequiredAdmin, typesUser); // Ruta para obtener tipos de usuario, requiere autenticación de administrador
router.get("/typesContact", authRequiredAdmin, typesContact); // Ruta para obtener tipos de contacto, requiere autenticación de administrador
router.get("/typesProduct", typesProduct); // Ruta para obtener tipos de producto, no requiere autenticación
router.get("/typesProvider", authRequiredAdmin, typesProvider); // Ruta para obtener tipos de proveedor, requiere autenticación de administrador
router.get("/typesStatusRepair", authRequiredAdmin, tyoesStatusRepair); // Ruta para obtener tipos de estado de reparación, requiere autenticación de administrador
router.get("/typesUrgency", authRequiredAdmin, typesUrgency); // Ruta para obtener tipos de urgencia, requiere autenticación de administrador

export default router; // Exporta el router para su uso en otros módulos