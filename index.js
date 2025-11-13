const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running fine");
});

const uri =
  "mongodb+srv://ecotrackUserServer:xKldrRJrIuQOKgAP@cluster0.luugan2.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    //  Connect to MongoDB
    await client.connect();
    console.log(" Connected to MongoDB!");

    //  Database reference
    const db = client.db("model-db");

    //  Routes
    app.get("/models", async (req, res) => {
      const result = await db.collection("models").find().toArray();
      res.send(result);
    });

    // --- USER CHALLENGES ---
    app.get("/api/user-challenges", async (req, res) => {
      try {
        const result = await db.collection("userChallenges").find().toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Error fetching user challenges", error });
      }
    });

    // --- TIPS ---
    app.get("/api/tips", async (req, res) => {
      try {
        const result = await db.collection("tips").find().limit(5).toArray(); 
      } catch (error) {
        res.status(500).send({ message: "Error fetching tips", error });
      }
    });

    // --- EVENTS ---
    app.get("/api/events", async (req, res) => {
      try {
        const result = await db.collection("events").find().limit(4).toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Error fetching events", error });
      }
    });

    // --- MY ACTIVITIES ---
    app.get("/api/my-activities", async (req, res) => {
      try {
        const result = await db.collection("userActivities").find().toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Error fetching user activities", error });
      }
    });

    // --- STATS (Static Example) ---
    app.get("/api/stats", (req, res) => res.json({ users: 10 }));

    // MongoDB ping check
    await db.command({ ping: 1 });
    console.log(" Ping successful! MongoDB connected.");
  } catch (error) {
    console.error(" MongoDB connection failed:", error);
  }
}

run().catch(console.dir);

//  Simple test route
app.get("/hello", (req, res) => {
  res.send("How are you");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
