const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes");
const cors = require('cors');
const mongoose = require('mongoose');
const wakeUpDyno = require("./wake_dyno");

const server_endpointURL = 'https://internet-shutdowns-server-host.herokuapp.com/all_messages';
const endclient_endpointURL = 'https://internet-shutdowns-endclient.herokuapp.com/';

cors({credentials: true, origin: true})
app.use(cors());
app.options('*', cors());

const dbPassword = 'igmRQI0dozVacCDZ';
mongoose.connect('mongodb+srv://georgedobrin:' + dbPassword + '@cluster0.vmmva.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true });

let port = process.env.PORT || 8070;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/", routes);

app.listen(port, () => {
    console.log("Server is starting..");
    wakeUpDyno(server_endpointURL);
});