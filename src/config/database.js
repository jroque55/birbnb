import mongoose from 'mongoose';

export class MongoDBCliente {
    static async connect() {
        try {

            const localURI = process.env.MONGO_URL || 'mongodb://localhost:27017/birbnb';


            const conn = await mongoose.connect(localURI);

            console.log(`MongoDB conectado: ${conn.connection.host}`);
        } catch (error) {
            console.error(`Error de conexión: ${error.message}`);
            process.exit(1);
        }
    }
}

export class MongoDBTest {
    static async connect() {
        const localURI = process.env.MONGO_URL || 'mongodb://localhost:27017/birbnb';


        const conn = await mongoose.connect(localURI);
    }
}
