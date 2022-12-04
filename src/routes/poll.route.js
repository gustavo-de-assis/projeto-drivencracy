import { Router } from "express";
import { getPoll, postPoll, getPollChoices } from "../controllers/poll.controller.js";
import { pollValidation } from "../middlewares/poll.middleware.js";

const router = Router();

router.post("/poll", pollValidation, postPoll);
router.get("/poll", getPoll);
router.get("/poll/:id/choice", getPollChoices);


export default router;