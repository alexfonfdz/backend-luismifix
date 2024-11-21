import multer from 'multer'; // Importa multer para manejar la subida de archivos

const storage = multer.memoryStorage(); // Configura el almacenamiento en memoria para los archivos subidos
export const upload = multer({ storage }); // Exporta el middleware de multer configurado con el almacenamiento en memoria