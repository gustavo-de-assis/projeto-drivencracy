import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { choiceCollection, pollCollection, voteCollection } from "../database/db.js";

export async function postPoll(req, res) {
    const newPoll = req.body;

    try {
        const poll = await pollCollection.findOne({ title: newPoll.title });

        if (poll) {
            return res.status(409).send("Poll already exists!")
        }

        await pollCollection.insertOne({ ...newPoll })

        res.sendStatus(201);

    } catch (err) {
        console.log(err);
        res.status(500).send("Couldn't create poll!");
    }
}

export async function getPoll(req, res) {
    try {
        const polls = await pollCollection.find().toArray();
        res.send(polls).status(200);

    } catch (err) {
        res.sendStatus(500);
    }
}

export async function getPollChoices(req, res) {
    const id = req.params.id;
    const choices = await choiceCollection.find({ pollId: id }).toArray();


    try {
        if (choices.length === 0) {
            return res.status(404).send("Not Found!");
        }
        return res.status(200).send(choices);
    }
    catch (err) {
        res.sendStatus(500);
    }
}

export async function getPollResults(req, res) {
    const id = req.params.id;
    const poll = await pollCollection.findOne({ _id: new ObjectId(id) });
     
    try {
        if (!poll) {
            return res.status(404).send("Not Found!");
        }

        /*const voteArray = await voteCollection.find({ pollId: id }).toArray();

        const maxResult = Math.max(...voteArray.map((v) => v.votes));
    
        const mostVoted = voteArray.filter((v) => v.votes === maxResult)[0];
        */
        // Opções da enquete
        const choices = await choiceCollection.find({ pollId: id }).toArray();
        console.log('choices:',choices);
        //votos na enquete
        const votes = await voteCollection.find().toArray();
        //console.log('votes:',votes);
        //salvar objeto com numvotos, title
        const numVotes = [];
        let mostVoted;
        for(let i = 0; i < choices.length; i++){
            let num = 0;
            votes.map((v)=> v.choiceId === choices[i]._id.toString() ? num++ : num);

            numVotes.push(num);
            if(i === 0){
                mostVoted = i;
            }else if(num > numVotes[mostVoted]) {
                mostVoted = i;
            }
        }

        console.log(numVotes);

        
        const winner = {
            _id: poll._id,
            title: poll.title,
            expireAt: poll.expireAt,
            result: {
                title: choices[mostVoted].title,
                votes: numVotes[mostVoted]
            }
        };
        
        return res.status(200).send(winner);
    }
    catch (err) {
        res.sendStatus(500);
    }
}