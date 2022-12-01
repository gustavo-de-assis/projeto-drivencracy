import joi from "joi";

const pollSchema = joi.object({
    title: joi.string().min(20).required(), //min de 20 caracteres para pergunta
    expireAt: joi.date().required()
})

export function pollValidation(req, res, next) {
    const poll = req.body;

    const validationError = pollSchema.validate(poll, {
        abortEarly: false,
    }).error;

    if (validationError) {
        const error = validationError.details.map((e)=> e.message);
        return res.status(400).send(error);
    }

    next();
}