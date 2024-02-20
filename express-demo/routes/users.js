const express = require('express');
const router = express.Router();

router.get("/new", (req, res) => {
    console.log(req.query);
    res.render("user/new", {userName: "enter user name", work: "enter your job "});
});

router.get("/:userName", (req, res) => {
    res.send(`Get User data for : ${req.params.userName}`);
});

router.post("/", (req, res) => {
    res.send(req.body.userName);
})


router.route("/update/:id").get((req, res) => {
    res.send(`Update get user with ID : ${req.params.id}`);
}).post((req, res) => {
    res.send(`Update post user with ID : ${req.params.id}`);
}).delete((req, res) => {
    res.send(`Update delete user with ID : ${req.params.id}`);
}).put((req, res) => {
    res.send(`Update put user with ID : ${req.params.id}`);
});

// this will run before actual request code
router.param("id", (req, res, next, id) => {
    req.users = [{ name: "kelum"}, {name: "Darshi"}];
    next();
})

module.exports = router;