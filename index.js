const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.get('/',(req, res) => {
    res.send("Server is running fine")
})



const uri = "mongodb+srv://ecotrackUserServer:xKldrRJrIuQOKgAP@cluster0.luugan2.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    
    const db = client.db('model-db')
    const modelCollection = db.collection('models')

    app.get('/models', async (req, res) => {
        const result = await modelCollection.find().toArray()
        res.send(result)
    })
    
    // ***
     app.get("/api/user-challenges", async (req, res) => {
  try {
    const db = client.db("model-db");
    const userChallengesCollection = db.collection("userChallenges");
    const result = await userChallengesCollection.find().toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Error fetching user challenges", error });
  }
});

app.get("/api/tips", async (req, res) => {
  try {
    const db = client.db("model-db");
    const tipsCollection = db.collection("tips");
    const result = await tipsCollection.find().toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Error fetching tips", error });
  }
});



app.get("/api/stats", (req, res) => res.json({ users: 10 }));
app.get("/api/my-activities", (req, res) => res.json([]));


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}


run().catch(console.dir);



app.get('/hello', (req, res) =>{
    res.send('How are you')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
