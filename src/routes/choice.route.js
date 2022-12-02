import { Router } from "express";
import { postChoice } from "../controllers/choice.controller.js";
import { choiceValidation } from "../middlewares/choice.middleware.js";


const router = Router();

router.post("/choice", choiceValidation, postChoice);

export default router;