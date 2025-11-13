const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config()
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running fine");
});

const uri =
  `mongodb+srv://ecotrackUserServer:xKldrRJrIuQOKgAP@cluster0.luugan2.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    
    // await client.connect();
    console.log(" Connected to MongoDB!");
    const db = client.db("model-db");

    
    app.get("/models", async (req, res) => {
      const result = await db.collection("models").find().toArray();
      res.send(result);
    });

    
    app.get("/api/user-challenges", async (req, res) => {
      try {
        const result = await db.collection("userChallenges").find().toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Error fetching user challenges", error });
      }
    });

    
    app.get("/api/tips", async (req, res) => {
  try {
    const result = await db.collection("tips").find().limit(5).toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Error fetching tips", error });
  }
});


  
    app.get("/api/events", async (req, res) => {
      try {
        const result = await db.collection("events").find().limit(4).toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Error fetching events", error });
      }
    });

   
    app.get("/api/my-activities", async (req, res) => {
      try {
        const result = await db.collection("userActivities").find().toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Error fetching user activities", error });
      }
    });

   
    app.get("/api/stats", (req, res) => res.json({ users: 10 }));

  
    // await db.command({ ping: 1 });
    console.log(" Ping successful! MongoDB connected.");
  } catch (error) {
    console.error(" MongoDB connection failed:", error);
  }
}

run().catch(console.dir);


app.get("/hello", (req, res) => {
  res.send("How are you");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
