const express = require("express");
const mongodb = require("mongodb");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const mongoClient = new mongodb.MongoClient("mongodb://your-connection-url", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/api/data", async (req, res) => {
  try {
    await mongoClient.connect();
    const database = mongoClient.db("your-database-name");
    const collection = database.collection("your-collection-name");

    const data = await collection.find().toArray();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    await mongoClient.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
