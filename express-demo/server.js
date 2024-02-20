const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(logger);
app.use(express.urlencoded({extended: true}));

app.get("/testGet", (req, res) => {
    res.render("index", {name: "Kelum Deshapriya", work: "engineer"});
});

const userRouter = require("./routes/users");

app.use("/user", userRouter);

function logger(req, res, next) {
    console.log(req.originalUrl);
    next();
}

app.listen(3000); 