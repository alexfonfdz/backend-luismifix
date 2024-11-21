import Express from "express"; // Importa Express para crear la aplicación
import morgan from "morgan"; // Importa morgan para el registro de solicitudes HTTP
import cookieParser from "cookie-parser"; // Importa cookie-parser para manejar cookies
import cors from "cors"; // Importa cors para habilitar CORS (Cross-Origin Resource Sharing)
import authRoutes from "../routes/auth.routes.js"; // Importa las rutas de autenticación
import typesRoutes from "../routes/types.routes.js"; // Importa las rutas de tipos
import productRoutes from "../routes/products.routes.js"; // Importa las rutas de productos
import purchasesRoutes from "../routes/purchases.routes.js"; // Importa las rutas de compras
import historyRoutes from "../routes/historys.routes.js"; // Importa las rutas de historial
import providersRoutes from "../routes/providers.routes.js"; // Importa las rutas de proveedores
import dialogFlowRoutes from "../routes/dialogFlow.routes.js"; // Importa las rutas de DialogFlow
import fulfillmentRoutes from "../routes/fulfillment.routes.js"; // Importa las rutas de cumplimiento
import bodyParser from "body-parser"; // Importa body-parser para manejar el cuerpo de las solicitudes
import { FRONT_URL } from "./config.js"; // Importa la URL del frontend desde la configuración
import path from 'path'; // Importa path para manejar rutas de archivos
import imageProductRoutes from "../routes/imageProduct.routes.js"; // Importa las rutas de imágenes de productos
import historyOrdersRoutes from "../routes/historyOrders.routes.js"; // Importa las rutas de órdenes de historial
import { handleWebhook } from "../controllers/historyOrders.controller.js"; // Importa el controlador de webhook

const app = new Express(); // Crea una nueva aplicación Express

app.use(morgan("dev")); // Usa morgan para el registro de solicitudes HTTP
app.use(cookieParser()); // Usa cookie-parser para manejar cookies

// Configuración de CORS
const corsOptions = {
  origin: FRONT_URL,
  credentials: true,
  optionSuccessStatus: 200
};
app.use(cors(corsOptions)); // Usa cors con las opciones configuradas

// Configuración del webhook de Stripe
app.post('/webhook', bodyParser.raw({ type: 'application/json' }), handleWebhook);

// Usa body-parser para manejar el cuerpo de las solicitudes en formato JSON
app.use(bodyParser.json());

// Sirve archivos estáticos desde el directorio 'public'
app.use(Express.static(path.resolve(import.meta.dirname, '..', '..', 'public')));

// Configuración de rutas
app.use('/api', authRoutes); // Rutas de autenticación
app.use('/api/types', typesRoutes); // Rutas de tipos
app.use('/api/products', productRoutes); // Rutas de productos
app.use('/api/purchases', purchasesRoutes); // Rutas de compras
app.use('/api/historys', historyRoutes); // Rutas de historial
app.use('/api/providers', providersRoutes); // Rutas de proveedores
app.use('/api/images', imageProductRoutes); // Rutas de imágenes de productos
app.use('/api/historyOrders', historyOrdersRoutes); // Rutas de órdenes de historial

// Rutas de DialogFlow y cumplimiento
app.use(dialogFlowRoutes);
app.use(fulfillmentRoutes);

// Manejo de todas las demás rutas, sirviendo el archivo 'index.html'
app.get('*', (req, res) => {
  return res.sendFile(path.join(path.resolve(), "public", "index.html"));
});

//Easter egg
app.get('/god', (req, res) => {
  return res.sendFile(path.join(path.resolve(), "public", "god.html"));
});

export default app; // Exporta la aplicación Express