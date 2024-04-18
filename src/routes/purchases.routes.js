import { Router } from "express";
import { createPurchase, disablePurchase, enablePurchase, getAllPurchasesForProduct, getAllPurchasesForProvider, updatePurchase} from "../controllers/purchases.controller.js";
import { authRequiredAdmin } from "../middlewares/validateTokenAdmin.js";
import { authRequiredAllUsers } from "../middlewares/validateTokenAllUsers.js";

const router = new Router();

router.post('/', authRequiredAdmin, createPurchase);
router.get('/provider/:idProvider', authRequiredAllUsers, getAllPurchasesForProvider);
router.get('/product/:idProduct', authRequiredAllUsers, getAllPurchasesForProduct);
router.put('/:id', authRequiredAdmin, updatePurchase);
router.put('/disable/:id', authRequiredAdmin, disablePurchase);
router.put('/enable/:id', authRequiredAdmin, enablePurchase);

export default router;

