import express from "express";
import cors from "cors";
import pollRoute from "./routes/poll.route.js"

const app = express();

app.use(cors());
app.use(express.json());

app.use(pollRoute);

app.listen(5000, ()=> console.log("Server running at port 5000!"));