import joi from "joi";
import dayjs from "dayjs";

const pollSchema = joi.object({
    title: joi.string().min(20).required(), //min de 20 caracteres para pergunta
    expireAt: joi.string()
})

export function pollValidation(req, res, next) {
    const poll = req.body;

    poll.expireAt === "" ? 
    poll.expireAt = dayjs().add(30, 'day') .format('YYYY/MM/DD HH:mm:ss')
    : 
    poll.expireAt;

    console.log(poll);

    const validationError = pollSchema.validate(poll, {
        abortEarly: false,
    }).error;

    if (validationError) {
        const error = validationError.details.map((e)=> e.message);
        return res.status(422).send(error);
    }

    next();
}