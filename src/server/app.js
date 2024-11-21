import Express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "../routes/auth.routes.js";
import typesRoutes from "../routes/types.routes.js";
import productRoutes from "../routes/products.routes.js";
import purchasesRoutes from "../routes/purchases.routes.js";
import historyRoutes from "../routes/historys.routes.js";
import providersRoutes from "../routes/providers.routes.js";
import dialogFlowRoutes from "../routes/dialogFlow.routes.js";
import fulfillmentRoutes from "../routes/fulfillment.routes.js";
import bodyParser from "body-parser";
import { FRONT_URL } from "./config.js";
import path from 'path';
import imageProductRoutes from "../routes/imageProduct.routes.js";
import historyOrdersRoutes from "../routes/historyOrders.routes.js";
import { handleWebhook } from "../controllers/historyOrders.controller.js";

const app = new Express();

app.use(morgan("dev"));
app.use(cookieParser());
const corsOptions = {
  origin: FRONT_URL,
  credentials: true,
  optionSuccessStatus: 200
};
app.use(cors(corsOptions));

app.post('/webhook',bodyParser.raw({ type: 'application/json' }),
handleWebhook
);

app.use(bodyParser.json());
app.use(Express.static(path.resolve(import.meta.dirname, '..', 'public')));

app.use('/api', authRoutes);
app.use('/api/types', typesRoutes);
app.use('/api/products', productRoutes);
app.use('/api/purchases', purchasesRoutes);
app.use('/api/historys', historyRoutes);
app.use('/api/providers', providersRoutes);
app.use('/api/images', imageProductRoutes);
app.use('/api/historyOrders', historyOrdersRoutes);

app.use(dialogFlowRoutes);
app.use(fulfillmentRoutes);

app.get('*', (req, res) => {
  return res.sendFile(path.join(path.resolve(), "public", "index.html"));
});

export default app;