import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { choiceCollection, pollCollection } from "../database/db.js";

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

export async function getPoll(req, res){
    try{
        const polls = await pollCollection.find().toArray();
        res.send(polls).status(200);
        
    } catch (err){
        res.sendStatus(500);
    }
}

export async function getPollChoices(req, res){
    const id = req.params.id;
    const choices = await choiceCollection.find({pollId: id}).toArray();
    

    try{
        if(choices.length === 0){
            return res.status(404).send("Not Found!");
        }
        return res.status(200).send(choices);
    }
    catch(err){
        res.sendStatus(500);
    }
}