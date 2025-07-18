
import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://jroque:1NbW2F8F14VUChs0@birbnb.kmceoug.mongodb.net/?retryWrites=true&w=majority&appName=birbnb";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connect() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
connect().catch(console.dir);
