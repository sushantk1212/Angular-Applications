const express = require('express');
const eobj = express();
const port = 5100;

const { MongoClient } = require("mongodb");
const URL = "mongodb://localhost:27017";
const client = new MongoClient(URL);

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
        res.json(result);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Internal Server Error");
    }
}

async function main() {
    await GetConnection(); 
    console.log("Database connection is successful.");
}

main();
