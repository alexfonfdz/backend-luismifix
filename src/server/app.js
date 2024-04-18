import Express  from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "../routes/auth.routes.js";
import typesRoutes from "../routes/types.routes.js";

const app = new Express();

app.use(morgan("dev"));
app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/api', authRoutes)
app.use('/types', typesRoutes)

export default app;