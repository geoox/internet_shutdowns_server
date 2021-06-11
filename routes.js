const express = require("express");
const router = express.Router();
const Message = require("./message_model");


router.get("/hello", (req, res, next) => {
    return res.status(200).json({
        message: "hello",
    });
});

router.post("/new_message", (req, res, next) => {
    console.log('POST new message body: '+req.body);
    const newMessage = new Message({
        "message": req.body.message,
        "date": new Date()
    });

    newMessage.save().then(success =>
        res.status(200).json(success)
    ).catch(err => res.status(500).json(err));
});

router.get('/all_messages', (req, res, next) => {
    Message.find({}).then(messages => res.status(200).json(messages)).catch(err => res.status(500).json(err));
});

module.exports = router;