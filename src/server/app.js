import Express  from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "../routes/auth.routes.js";
import typesRoutes from "../routes/types.routes.js";
import productRoutes from "../routes/products.routes.js";
import purchasesRoutes from "../routes/purchases.routes.js";
import historyRoutes from "../routes/historys.routes.js";
import providersRoutes from "../routes/providers.routes.js";

const app = new Express();

app.use(morgan("dev"));
app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api/types', typesRoutes);
app.use('/api/products', productRoutes);
app.use('/api/purchases', purchasesRoutes);
app.use('/api/historys', historyRoutes);
app.use('/api/providers', providersRoutes);

export default app;