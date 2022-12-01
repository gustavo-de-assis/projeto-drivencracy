import { Router } from "express";
import { getPoll, postPoll } from "../controllers/poll.controller.js";
import { pollValidation } from "../middlewares/poll.middleware.js";

const router = Router();

router.post("/poll", pollValidation, postPoll);
router.get("/poll", getPoll);


export default router;