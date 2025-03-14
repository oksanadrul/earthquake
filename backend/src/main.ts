import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer } from '@apollo/server';
import path from 'node:path';
import cors from 'cors';
import { writeFileSync } from 'fs';

import { printSchema } from 'graphql';
import { expressMiddleware } from '@apollo/server/express4';
import { makeExecutableSchema } from '@graphql-tools/schema';

import { importCSVToMongoDB } from './middleware/importCSVToMongoDB';
import { clearAllData } from './middleware/clearAllData';
import { downloadCSV } from './middleware/downloadCSV';

import { typeDefs } from './schema/schema';
import { resolvers } from './resolvers';

// MongoDB URI and connection
const MONGODB_URI = 'mongodb://localhost:27017/myapp';

mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');

    // Define the URL of the CSV file to download
    const csvFileURL =
      'https://data.humdata.org/dataset/4881d82b-ba63-4515-b748-c364f3d05b42/resource/10ac8776-5141-494b-b3cd-bf7764b2f964/download'; // Replace with the actual URL
    const downloadPath = path.join(__dirname, 'data.csv'); // Path where the file will be saved

    try {
      await clearAllData();
      // Download the CSV file from the external URL
      await downloadCSV(csvFileURL, downloadPath);
      console.log('CSV file downloaded successfully');

      // Parse the CSV and insert the data into MongoDB
      await importCSVToMongoDB(downloadPath);
    } catch (error) {
      console.error('Error during CSV processing:', error);
    }
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Initialize Apollo Server
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const schemaString = printSchema(schema);
// Write the schema to a file
writeFileSync('schema.graphqls', schemaString);
console.log('Schema has been saved to schema.graphqls');

// Start Apollo Server and integrate with Express
async function startServer() {
  await server.start();
  app.use(express.json());
  app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
  app.use('/graphql', expressMiddleware(server));
  app.listen(4000, () => {
    console.log(`🚀 Server running at http://localhost:4000/graphql`);
  });
}

startServer();
