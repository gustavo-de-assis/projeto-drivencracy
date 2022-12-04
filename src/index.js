import express from "express";
import cors from "cors";
import pollRoute from "./routes/poll.route.js"
import choiceRoute from "./routes/choice.route.js"
const app = express();

app.use(cors());
app.use(express.json());

app.use(pollRoute);
app.use(choiceRoute);

app.listen(5000, ()=> console.log("Server running at port 5000!"));