import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { choiceCollection, pollCollection, voteCollection } from "../database/db.js";

export async function postChoice(req, res) {
    const newChoice = req.body;

    try {
        const choice = await choiceCollection.findOne({ title: newChoice.title });

        if (choice) {
            return res.status(409).send("Choice already exists!");
        }

        const poll = await pollCollection.findOne({ _id: ObjectId(newChoice.pollId) });

        if (!poll) {
            return res.status(404).send("Poll not found!");
        }

        if (dayjs().isAfter(poll.expireAt)) {
            return res.status(403).send("Poll already expired!");
        }

        await choiceCollection.insertOne({ ...newChoice });
        /*await voteCollection.insertOne({...newChoice, votes: 0})*/

        res.sendStatus(201);

    } catch (err) {
        console.log(err);
        res.status(500).send("Couldn't create choice!");
    }
}

export async function voteChoice(req, res) {
    const id = req.params.id;
    const choice = await choiceCollection.findOne({ _id: new ObjectId(id) })

    try {
        //Existe a opcao?
        if (!choice) {
            return res.status(404).send("Not Found!");
        }

        const poll = await pollCollection.findOne({ _id: new ObjectId(choice.pollId) });

        //Enquete expirada?
        if (dayjs().isAfter(poll.expireAt)) {
            return res.status(403).send("Poll already expired!");
        }

        await voteCollection.insertOne({
            createdAt: dayjs().format('YYYY/MM/DD HH:mm:ss'),
            choiceId: new ObjectId(id)
        })

        /*let updateVote = Number(choice.votes);
        isNaN(updateVote)? updateVote = 1 : updateVote++;

        voteCollection.updateOne({_id: new ObjectId(id)}, 
        {$set: {votes: updateVote}})

        voteCollection.updateOne({_id: new ObjectId(id)}, {$push:{date: dayjs().format('YYYY/MM/DD HH:mm:ss')}})

        console.log(choice);*/

        return res.sendStatus(200);
    } catch (err) {
        res.sendStatus(500);
    }

}