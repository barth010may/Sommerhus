// lib/mongodb.ts
import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI
const options = {
  maxPoolSize: 10,
  minPoolSize: 2,
  maxIdleTimeMS: 30000,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
}

let client
let clientPromise: Promise<MongoClient>

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient>
}

function getClientPromise() {
  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable")
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options)
      global._mongoClientPromise = client.connect()
    }
    return global._mongoClientPromise
  } else {
    if (!clientPromise) {
      client = new MongoClient(uri, options)
      clientPromise = client.connect()
    }
    return clientPromise
  }
}

export async function connectToDatabase() {
  const mongoClient = await getClientPromise()
  const db = mongoClient.db("Sommerhus")
  return { client: mongoClient, db }
}
