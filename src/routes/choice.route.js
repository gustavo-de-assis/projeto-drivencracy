import { Router } from "express";
import { postChoice, voteChoice } from "../controllers/choice.controller.js";
import { choiceValidation } from "../middlewares/choice.middleware.js";


const router = Router();

router.post("/choice", choiceValidation, postChoice);
router.post("/choice/:id/vote", voteChoice);
export default router;