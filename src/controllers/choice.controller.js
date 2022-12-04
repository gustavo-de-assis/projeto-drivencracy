import dayjs from "dayjs";
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
        
        if(dayjs().isAfter(poll.expireAt)){
            console.log(poll.expireAt);
            console.log(dayjs());

            return res.status(403).send("Poll already expired!");
        }

        await choiceCollection.insertOne({...newChoice});

        res.sendStatus(201);

    }catch (err){
        console.log(err);
        res.status(500).send("Couldn't create choice!");
    }
}

export async function voteChoice(req, res){
    const id = req.params.id;
    const choice = await choiceCollection.findOne({_id: new ObjectId(id)})

    //atualizar valor da escolha
    try{
        if(!choice){
            return res.status(404).send("Not Found!");
        }

        let updateVote = Number(choice.votes);
        isNaN(updateVote)? updateVote = 1 : updateVote++;
    
        console.log(updateVote);

        choiceCollection.updateOne({_id: new ObjectId(id)}, {$set: {votes: updateVote}})
        return res.sendStatus(200);
    } catch (err){
        res.sendStatus(500);
    }

}