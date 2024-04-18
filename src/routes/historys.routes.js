import Router from 'express';
import { getAllHistoryProducts, getAllHistoryProviders, getAllHistoryPurchases, moreDetailsHistoryProduct, moreDetailsHistoryProvider, moreDetailsHistoryPurchase, searchInHistoryProductsForNameProductUserDate, searchInHistoryProvidersForNameProviderUserDate, searchInHistoryPurchasesForNameProductUserDate} from "../controllers/historys.controller.js";
import { authRequiredAdmin } from "../middlewares/validateTokenAdmin.js";

const router = new Router();

router.get('/products', authRequiredAdmin, getAllHistoryProducts);
router.get('/providers', authRequiredAdmin, getAllHistoryProviders);
router.get('/purchases', authRequiredAdmin, getAllHistoryPurchases);
router.get('/products/:id', authRequiredAdmin, moreDetailsHistoryProduct);
router.get('/providers/:id', authRequiredAdmin, moreDetailsHistoryProvider);
router.get('/purchases/:id', authRequiredAdmin, moreDetailsHistoryPurchase);
router.post('/products/search', authRequiredAdmin, searchInHistoryProductsForNameProductUserDate);
router.post('/providers/search', authRequiredAdmin, searchInHistoryProvidersForNameProviderUserDate);
router.post('/purchases/search', authRequiredAdmin, searchInHistoryPurchasesForNameProductUserDate);

export default router;