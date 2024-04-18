import Routes from "moongose/routes";
import { createProduct, disableProduct, enableProduct, getAllProducts, getProduct, searchProductForName} from "../controllers/products.controller.js";
import { authRequiredAdmin } from "../middlewares/validateTokenAdmin.js";
import { authRequiredAllUsers } from "../middlewares/validateTokenAllUsers.js";

const router = new Routes();

router.post('/', authRequiredAdmin, createProduct);
router.get('/', authRequiredAllUsers, getAllProducts);
router.get('/product/:id', authRequiredAllUsers, getProduct);
router.get('/search/:name', authRequiredAllUsers, searchProductForName);
router.put('/disable/:id', authRequiredAdmin, disableProduct);
router.put('/enable/:id', authRequiredAdmin, enableProduct);

export default router;