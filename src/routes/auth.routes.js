import { Router } from "express"; // Importa Router de Express para crear rutas
import { register, login, logout, profile, getUsers, getUser, searchUserForUsername, updateUser, changePassword, disableUser, enableUser } from "../controllers/auth.controller.js"; // Importa los controladores para manejar las solicitudes relacionadas con la autenticación y gestión de usuarios
import { authRequiredAllUsers } from "../middlewares/validateTokenAllUsers.js"; // Importa el middleware de autenticación para todos los usuarios
import { authRequiredAdmin } from "../middlewares/validateTokenAdmin.js"; // Importa el middleware de autenticación para administradores

const router = Router(); // Crea una nueva instancia de Router

// Define las rutas y aplica el middleware de autenticación donde sea necesario
router.post("/register", register); // Ruta para registrar un nuevo usuario
router.post("/login", login); // Ruta para iniciar sesión
router.post("/logout", logout); // Ruta para cerrar sesión
router.get("/profile", authRequiredAllUsers, profile); // Ruta para obtener el perfil del usuario autenticado, requiere autenticación de cualquier usuario
router.get("/users", authRequiredAdmin, getUsers); // Ruta para obtener todos los usuarios, requiere autenticación de administrador
router.get("/users/:id", authRequiredAdmin, getUser); // Ruta para obtener un usuario por su ID, requiere autenticación de administrador
router.get("/searchUserForUsername/:username", authRequiredAdmin, searchUserForUsername); // Ruta para buscar un usuario por su nombre de usuario, requiere autenticación de administrador
router.put("/updateUser/:id", authRequiredAdmin, updateUser); // Ruta para actualizar un usuario existente, requiere autenticación de administrador
router.put("/changePassword/:id", authRequiredAllUsers, changePassword); // Ruta para cambiar la contraseña de un usuario, requiere autenticación de cualquier usuario
router.put("/disableUser/:id", authRequiredAdmin, disableUser); // Ruta para deshabilitar un usuario, requiere autenticación de administrador
router.put("/enableUser/:id", authRequiredAdmin, enableUser); // Ruta para habilitar un usuario, requiere autenticación de administrador

export default router; // Exporta el router para su uso en otros módulos