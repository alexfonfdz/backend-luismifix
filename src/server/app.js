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
import path from 'path'

const app = new Express();

app.use(morgan("dev"));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(Express.json());
app.use(Express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(Express.static(path.resolve(import.meta.dirname, '..', 'public')))

app.use('/api', authRoutes);
app.use('/api/types', typesRoutes);
app.use('/api/products', productRoutes);
app.use('/api/purchases', purchasesRoutes);
app.use('/api/historys', historyRoutes);
app.use('/api/providers', providersRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(import.meta.dirname, '..', 'public', 'index.html'));
});

export default app;