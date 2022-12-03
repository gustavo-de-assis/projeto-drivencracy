import { ObjectId } from "mongodb";
import { choiceCollection, pollCollection } from "../database/db.js";

export async function postChoice(req, res){
    const newChoice = req.body;

    try{
        const choice = await choiceCollection.findOne({ title: newChoice.title });
        
        if (choice) {
            return res.status(409).send("Choice already exists!");
        }
        
        const poll = await pollCollection.findOne({_id: ObjectId(newChoice.pollId)});
        
        if(!poll){
            return res.status(404).send("Poll not found!");
        }

        await choiceCollection.insertOne({...newChoice});

        res.sendStatus(201);

    }catch (err){
        console.log(err);
        res.status(500).send("Couldn't create choice!");
    }
}