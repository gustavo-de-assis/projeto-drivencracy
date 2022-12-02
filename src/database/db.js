import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
    await mongoClient.connect();
    console.log("Connected to MongoDB server");
} catch (err) {
    console.log(err);
}

const db = mongoClient.db("drivencracyDB");

export const pollCollection = db.collection("polls");
export const choiceCollection = db.collection("choice");