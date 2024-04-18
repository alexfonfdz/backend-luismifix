import { Router } from "express";
import { typesUser, tyoesStatusRepair, typesContact, typesProduct, typesProvider, typesUrgency } from "../controllers/types.controller.js";

const router = Router();

router.get("/typesUser", typesUser);
router.get("/typesContact", typesContact);
router.get("/typesProduct", typesProduct);
router.get("/typesProvider", typesProvider);
router.get("/typesStatusRepair", tyoesStatusRepair);
router.get("/typesUrgency", typesUrgency);


export default router;