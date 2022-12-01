import { pollCollection } from "../database/db.js";

export async function postPoll(req, res){
    const newPoll = req.body;

    try{
        const poll = await pollCollection.findOne({ title: newPoll.title });

        if (poll) {
            return res.status(409).send("Poll already exists!")
        }

        await pollCollection.insertOne({...newPoll})

        res.sendStatus(201);

    }catch (err){
        console.log(err);
        res.status(500).send("Couldn't create poll!");
    }
}