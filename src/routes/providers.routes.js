import { Router } from "express";
import { createProvider, createProviderContact, disableProvider, enableProvider, getProvider, getProviderContacts, getProviders, searchProviderForName, updateProvider, updateProviderContact} from "../controllers/providers.controller.js";
import { authRequiredAdmin } from "../middlewares/validateTokenAdmin.js";
import { authRequiredAllUsers } from "../middlewares/validateTokenAllUsers.js";

const router = new Router();

router.post('/', authRequiredAdmin, createProvider);
router.post('/contact', authRequiredAdmin, createProviderContact);
router.get('/', authRequiredAllUsers, getProviders);
router.get('/provider/:id', authRequiredAllUsers, getProvider);
router.get('/contacts/:idProvider', authRequiredAllUsers, getProviderContacts);
router.get('/search/:name', authRequiredAllUsers, searchProviderForName);
router.put('/:id', authRequiredAdmin, updateProvider);
router.put('/contact/:id', authRequiredAdmin, updateProviderContact);
router.put('/disable/:id', authRequiredAdmin, disableProvider);
router.put('/enable/:id', authRequiredAdmin, enableProvider);

export default router;