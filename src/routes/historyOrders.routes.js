import express from 'express';
import { Router } from 'express';
import { getPurchaseHistoryByUser, getAllPurchaseHistories, addToCart, getCart, updateCart, calculateTotalPrice, createCheckoutSession, handleWebhook } from '../controllers/historyOrders.controller.js';
import { authRequiredAllUsers } from '../middlewares/validateTokenAllUsers.js';
import { authRequiredAdmin } from '../middlewares/validateTokenAdmin.js';

const router = new Router();

router.get('/user/:userId', authRequiredAllUsers, getPurchaseHistoryByUser);
router.get('/all', authRequiredAdmin, getAllPurchaseHistories);
router.post('/add', authRequiredAllUsers, addToCart);
router.get('/cart/:userId', authRequiredAllUsers, getCart);
router.put('/update', authRequiredAllUsers, updateCart);
router.get('/total/:userId', authRequiredAllUsers, calculateTotalPrice);
router.post('/create-checkout-session', authRequiredAllUsers, createCheckoutSession);
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

export default router;