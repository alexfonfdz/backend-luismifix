import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;

export const MONGO_URL = process.env.MONGO_URL;

export const SECRET = process.env.SECRET;

export const MONGO_DB = process.env.MONGO_DB;

export const FRONT_URL = process.env.FRONTEND_URL;

export const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;

export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;