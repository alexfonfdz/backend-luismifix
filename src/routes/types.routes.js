import { Router } from "express";
import { typesUser, tyoesStatusRepair, typesContact, typesProduct, typesProvider, typesUrgency } from "../controllers/types.controller.js";
import { authRequiredAdmin } from "../middlewares/validateTokenAdmin.js";

const router = Router();

router.get("/typesUser", authRequiredAdmin, typesUser);
router.get("/typesContact", authRequiredAdmin, typesContact);
router.get("/typesProduct", authRequiredAdmin, typesProduct);
router.get("/typesProvider", authRequiredAdmin, typesProvider);
router.get("/typesStatusRepair", authRequiredAdmin, tyoesStatusRepair);
router.get("/typesUrgency", authRequiredAdmin, typesUrgency);


export default router;