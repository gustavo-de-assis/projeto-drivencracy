import { Router } from "express";
import { getPoll, postPoll, getPollChoices, getPollResults } from "../controllers/poll.controller.js";
import { pollValidation } from "../middlewares/poll.middleware.js";

const router = Router();

router.post("/poll", pollValidation, postPoll);
router.get("/poll", getPoll);
router.get("/poll/:id/choice", getPollChoices);
router.get("/poll/:id/result", getPollResults);

export default router;