import { Router } from "express";
import { handleTextQuery, handleEventQuery } from "../controllers/dialogFlow.controller.js";

const router = Router();

router.post("/api/df_text_query", handleTextQuery);
router.post("/api/df_event_query", handleEventQuery);

export default router;