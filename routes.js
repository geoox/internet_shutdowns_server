const express = require("express");
const router = express.Router();
const Message = require("./message_model");


router.get("/hello", (req, res, next) => {
    return res.status(200).json({
        message: "hello",
    });
});

router.post("/new_message", (req, res, next) => {
    console.log('POST new message body: ', req.body);

    const message = req.body.payload_raw;
    console.log('received message: ', message);

    // decode from base64 to string
    var decodedMessage = Buffer.from(message, 'base64').toString('ascii');

    const newMessage = new Message({
        "message": decodedMessage,
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