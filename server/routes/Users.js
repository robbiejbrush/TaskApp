const express = require("express");
const router = express.Router();
const { Users } = require('../models');

router.post("/", async (req, res) => {
    const {email, name} = req.body;

    const user = await Users.findOne( {where: {email: email}} );

    if (!user) {
        Users.create({
            email: email,
            name: name
        })
        res.json("New user signed in.");
    } else {
        res.json("Old user signed in.");
    }
});

module.exports = router;