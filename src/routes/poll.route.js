import { Router } from "express";
import { postPoll } from "../controllers/poll.controller.js";
import { pollValidation } from "../middlewares/poll.middleware.js";

const router = Router();

router.post("/poll", pollValidation, postPoll);


export default router;