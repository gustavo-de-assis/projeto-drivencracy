import { Router } from "express";
import { postPoll } from "../controllers/poll.controller.js";

const router = Router();

router.post("/poll", postPoll);


export default router;