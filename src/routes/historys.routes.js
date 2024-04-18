import Routes from "moongose/routes";
import { getAllHistoryProducts, getAllHistoryProviders, getAllHistoryPurchases, moreDetailsHistoryProduct, moreDetailsHistoryProvider, moreDetailsHistoryPurchase, searchInHistoryProductsForNameProductUserDate, searchInHistoryProvidersForNameProviderUserDate, searchInHistoryPurchasesForNameProductUserDate} from "../controllers/historys.controller.js";
import { authRequiredAdmin } from "../middlewares/validateTokenAdmin.js";

const routes = new Routes();

routes.get('/products', authRequiredAdmin, getAllHistoryProducts);
routes.get('/providers', authRequiredAdmin, getAllHistoryProviders);
routes.get('/purchases', authRequiredAdmin, getAllHistoryPurchases);
routes.get('/products/:id', authRequiredAdmin, moreDetailsHistoryProduct);
routes.get('/providers/:id', authRequiredAdmin, moreDetailsHistoryProvider);
routes.get('/purchases/:id', authRequiredAdmin, moreDetailsHistoryPurchase);
routes.post('/products/search', authRequiredAdmin, searchInHistoryProductsForNameProductUserDate);
routes.post('/providers/search', authRequiredAdmin, searchInHistoryProvidersForNameProviderUserDate);
routes.post('/purchases/search', authRequiredAdmin, searchInHistoryPurchasesForNameProductUserDate);

export default routes;