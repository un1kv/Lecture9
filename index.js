
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
require("dotenv").config();


const app = express();

const PORT = 5556 || 3000;

mongoose.connect(
`mongodb+srv://nehamab:arvkv.1010@cluster0.sjinh.mongodb.net/?retryWrites=true&w=majority `
);
console.log(mongoose.connection.readyState)

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(PORT, () => {
  console.log("Server is up on port " + PORT);
});


