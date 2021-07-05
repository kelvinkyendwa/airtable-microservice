const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());
require('dotenv').config()

app.post('/airtable/user-signups', (req, res) => {
    const {email, name, country} = req.body;
    const config = {
        headers: {
            "Authorization": `Bearer ${process.env.API_KEY}`,
            "Content-Type": "application/json"

        }
    }
    console.log(req.body);
    axios.post(`${process.env.AIRTABLE_URL}${process.env.AIRTABLE_BASE}/${process.env.AIRTABLE_SIGNUPS_TABLE}`,
        {
            "records": [
                {
                    "fields": {
                        name,
                        email,
                        country
                    }
                },
            ]
        },
        config
    ).then(r => console.log("successful data transfer", r.data));
    res.status(201).send('successful data transfer');
});

app.post('/airtable/premium', (req, res) => {
    const {email, name} = req.body;
    const config = {
        headers: {
            "Authorization": `Bearer ${process.env.API_KEY}`,
            "Content-Type": "application/json"

        }
    }
    console.log(req.body);
    axios.post(`${process.env.AIRTABLE_URL}${process.env.AIRTABLE_BASE}/${process.env.AIRTABLE_PREMIUM_USERS_TABLE}`,
        {
            "records": [
                {
                    "fields": {
                        name,
                        email,
                    }
                },
            ]
        },
        config
    ).then(r => console.log("successful data transfer", r.data));
    res.status(201).send('successful data transfer');
});

app.listen(4000, () => {
    console.log("server listening on 4000");
});
