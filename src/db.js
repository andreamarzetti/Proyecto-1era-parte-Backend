const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');

// URL para la base de datos local
const localURI = 'mongodb://localhost:27017/miapp';
// URL para MongoDB Atlas (reemplaza con tu contraseña)
const atlasURI = "mongodb+srv://AndreaMarzetti:sanlorenzo999@cluster1.ecdutkg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

// Función para conectar a MongoDB usando Mongoose
const connectMongoose = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected using Mongoose');
  } catch (err) {
    console.error('Error connecting to MongoDB using Mongoose:', err.message);
    process.exit(1);
  }
};

// Función para conectar a MongoDB Atlas usando MongoClient
const connectMongoClient = async (uri) => {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB using MongoClient!");
  } catch (err) {
    console.error('Error connecting to MongoDB using MongoClient:', err.message);
  } finally {
    await client.close();
  }
};

// Función principal para conectar a la base de datos
const connectDB = async () => {
  const useAtlas = process.env.USE_ATLAS === 'true';
  const uri = useAtlas ? atlasURI : localURI;
  if (useAtlas) {
    await connectMongoClient(uri);
  } else {
    await connectMongoose(uri);
  }
};

module.exports = connectDB;