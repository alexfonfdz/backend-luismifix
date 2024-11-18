import { Router } from "express";
import { WebhookClient } from "dialogflow-fulfillment";

const router = Router();

router.post('/', (req, res) => {
  const agent = new WebhookClient({ request: req, response: res });
  let intentMap = new Map();
  agent.handleRequest(intentMap);
});

export default router;