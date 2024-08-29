const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { userRouter } = require("./routers/user.router");

const app = express();


app.use(cors({
    origin: true
}));

app.use(express.json());

app.use("/users", userRouter);

app.listen(8080, async () => {
    try {
        await connection;
        console.log("Connected to the server");
    } catch (error) {
        console.log(error);
    }
});
