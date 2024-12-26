const express = require('express');
const bodyParser = require('body-parser'); // For parsing JSON body
const eobj = express();
const port = 5100;

const { MongoClient } = require("mongodb");
const URL = "mongodb://localhost:27017";
const client = new MongoClient(URL);

eobj.use(bodyParser.json()); // Middleware for parsing JSON

async function GetConnection() {
    let result = await client.connect();
    let db = result.db("Marvellous");
    return db.collection("Batches");
}

eobj.listen(port, () => {
    console.log(`Server running successfully on port ${port}`);
});

// Handling CORS
eobj.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

eobj.get('/getBatches', MarvellousGetBatches);

async function MarvellousGetBatches(req, res) {
    try {
        let data = await GetConnection();
        let result = await data.find().toArray();
        console.log("Data Retrieved from database...");
        res.send(result);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Internal Server Error");
    }
}

eobj.post('/addBatches', MarvellousAddBatches);

async function MarvellousAddBatches(req, res){
	try {
        const { Name, Fees, Duration } = req.body; // Get data from request body

        if (!Name || !Fees || !Duration) {
            return res.status(400).send("Missing required fields: Name, Fees, or Duration");
        }

        let data = await GetConnection();
        const result = await data.insertOne({ Name, Fees, Duration });
        console.log("Data Inserted into database:", result);
        res.status(201).send(result); // Send inserted document as response
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Internal Server Error");
    }
}

function main() {
    GetConnection(); 
    console.log("Database connection is successful.");
}

main();