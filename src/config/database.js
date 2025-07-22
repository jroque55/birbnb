import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGO_URL || "mongodb://localhost:27017/birbnb";

const client = new MongoClient(uri, {
  serverApi: {
    tls:true,
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let database;

export async function connectToDatabase() {
  if (database) return database; 
  try {
    await client.connect();
    database = client.db('birbnb'); 
    
    console.log(process.env.MONGO_URL)
    console.log(process.env.PRIVATE_TOKEN)

    await database.command({ ping: 1 });
    console.log("Conexión exitosa a MongoDB!");
    
    return database;
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  }
}

process.on('SIGINT', async () => {
  await client.close();
  console.log('Conexión a MongoDB cerrada');
  process.exit(0);
});