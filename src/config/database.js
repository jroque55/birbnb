import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const uri = process.env.MONGO_URL || "mongodb://localhost:27017/birbnb";

// Configuración del cliente
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let database;

export async function connectToDatabase() {
  if (database) return database; // Reutiliza la conexión si existe
  
  try {
    await client.connect();
    database = client.db('birbnb'); // Especifica el nombre de la BD
    
    // Verifica la conexión
    await database.command({ ping: 1 });
    console.log("Conexión exitosa a MongoDB!");
    
    return database;
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  }
}

// Manejo de cierre limpio
process.on('SIGINT', async () => {
  await client.close();
  console.log('Conexión a MongoDB cerrada');
  process.exit(0);
});