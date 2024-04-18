import Express  from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "../routes/auth.routes.js";

const app = new Express();

app.use(morgan("dev"));
app.use(Express.json());
app.use(cookieParser());

app.use('/api', authRoutes)

export default app;