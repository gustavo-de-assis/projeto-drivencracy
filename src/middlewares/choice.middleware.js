import joi from "joi";

const choiceSchema = joi.object({
    title: joi.string().min(1).required(), //min de 1 caracteres para pergunta
    pollId: joi.string().required()
})

export function choiceValidation(req, res, next) {
    const choice = req.body;

    const validationError = choiceSchema.validate(choice, {
        abortEarly: false,
    }).error;

    if (validationError) {
        const error = validationError.details.map((e)=> e.message);
        return res.status(400).send(error);
    }

    next();
}