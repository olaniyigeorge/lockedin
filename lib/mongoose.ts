import mongoose, { Connection } from "mongoose";
import { GridFSBucket } from "mongodb";

let client: Connection | null = null;
let bucket: GridFSBucket | null = null;

const MONGODB_URI = process.env.MONGODB_URI as string;

interface DbConnection {
  client: Connection;
  bucket: GridFSBucket;
}

async function connectToDb(): Promise<DbConnection> {
  if (client) {
    return { client, bucket: bucket as GridFSBucket };
  }

  await mongoose.connect(MONGODB_URI);

  client = mongoose.connection;

  // Ensure `client.db` is defined before using it
  if (!client.db) {
    throw new Error("MongoDB connection is not established properly.");
  }

  bucket = new mongoose.mongo.GridFSBucket(client.db, {
    bucketName: "images",
  });

  console.log("Connected to the Database");
  return { client, bucket };
}

export default connectToDb;
